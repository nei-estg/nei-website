from datetime import timezone
import datetime
from django.contrib.auth.models import Group
from django.forms import ValidationError
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail

class CreateOnlyModelViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
  pass

class CreateAndViewModelViewSet(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
  pass

class ContactViewSet(CreateOnlyModelViewSet):
  """
  API endpoint that allows people to contact us.
  """
  queryset = ContactModel.objects.all()
  serializer_class = ContactSerializer
  permission_classes = []

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows FAQs to be viewed.
  """
  queryset = FAQModel.objects.all().prefetch_related('category')
  serializer_class = FAQSerializer
  permission_classes = []
  filterset_fields = FAQSerializer.Meta.fields
  pagination_class = None

class CalendarViewSet(CreateAndViewModelViewSet):
  """
  API endpoint that allows calendar events to be viewed or created.
  """
  queryset = CalendarModel.objects.filter(visible=True).prefetch_related('curricularUnit')
  serializer_class = CalendarSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = CalendarSerializer.Meta.fields
  pagination_class = None
  
  def create(self, request, *args, **kwargs):
    curricularUnitJson = request.data.get('curricularUnit', None)
    if curricularUnitJson:
      curricularUnit = CurricularUnitModel.objects.get(id=curricularUnitJson.get('id', None))
      if curricularUnit:
        serializer = CalendarSerializer(data=request.data)
        if serializer.is_valid():
          serializer.save(curricularUnit=curricularUnit)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows courses to be viewed.
  """
  queryset = CourseModel.objects.all()
  serializer_class = CourseSerializer
  permission_classes = []
  filterset_fields = CourseSerializer.Meta.fields
  pagination_class = None
  
  #* Append the curricular units to each course in the list
  def list(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = CourseSerializer(queryset, many=True)
    data = serializer.data
    for i in range(len(data)):
      data[i]['curricularUnits'] = CurricularUnitSerializer(CurricularUnitModel.objects.filter(course__abbreviation=data[i]['abbreviation']), many=True).data
    return Response(data)

class CurricularUnitViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows curricular units to be viewed.
  """
  queryset = CurricularUnitModel.objects.all().prefetch_related('course')
  serializer_class = CurricularUnitSerializer
  permission_classes = []
  filterset_fields = CurricularUnitSerializer.Meta.fields
  pagination_class = None

class MaterialTagViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows material tags to be viewed.
  """
  queryset = MaterialTagModel.objects.all()
  serializer_class = MaterialTagSerializer
  permission_classes = []
  filterset_fields = MaterialTagSerializer.Meta.fields
  pagination_class = None

class MaterialViewSet(CreateAndViewModelViewSet):
  """
  API endpoint that allows materials to be viewed or edited.
  """
  queryset = MaterialModel.objects.filter(visible=True).prefetch_related('tags', 'curricularUnit')
  serializer_class = MaterialSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = ['name', 'tags', 'curricularUnit']
  pagination_class = None

  def create(self, request, *args, **kwargs): #TODO: Improve this method
    curricularUnitJson = request.data.get('curricularUnit', None)
    
    #Check if we have a curricular unit
    if not curricularUnitJson:
      return Response({'detail': 'Curricular Unit JSON not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    curricularUnit = CurricularUnitModel.objects.get(id=curricularUnitJson.get('id', None))
    
    if not curricularUnit:
      return Response({'detail': 'Curricular Unit not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    tagsJson = request.data.get('tags', [])
    if not tagsJson:
      return Response({'detail': 'Tags JSON not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    tags = []
    for tagJson in tagsJson:
      tag = MaterialTagModel.objects.get(name=tagJson.get('name', None))
      if tag:
        tags.append(tag)
      else:
        return Response({'detail': 'Tag not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    material = MaterialModel.objects.create(name=request.data.get('name', ''), link=request.data.get('link', ''), curricularUnit=curricularUnit)
    
    material.tags.set(tags)
    return Response(MaterialSerializer(material).data, status=status.HTTP_201_CREATED)


class MentoringRequestViewSet(CreateAndViewModelViewSet):
  """
  API endpoint that allows mentorship requests to be viewed or edited.
  """
  queryset = MentoringRequestModel.objects.all().prefetch_related('mentee', 'curricularUnit')
  serializer_class = MentoringRequestSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentoringRequestSerializer.Meta.fields
  pagination_class = None

  def retrieve(self, request, *args, **kwargs):
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
  
  def get_queryset(self):
    queryset = super().get_queryset()
    
    queryset = queryset.filter(curricularUnit__course__in=self.request.user.profilemodel.course.all()).prefetch_related('mentee', 'curricularUnit')
    
    return queryset
  
  #* Hide users from requests
  def list(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = MentoringRequestSerializer(queryset, many=True)
    data = serializer.data
    newData = []
    for i in range(len(data)):
      if data[i]['mentee']['id'] != request.user.id:
        data[i]['mentee'] = None
        newData.append(data[i])
      else:
        newData.append(data[i])
    return Response(newData)

  #* Create Mentoring Request
  def create(self, request, *args, **kwargs):
    curricularUnitJson = request.data.get('curricularUnit', None)
    if curricularUnitJson:
      curricularUnit = CurricularUnitModel.objects.get(id=curricularUnitJson.get('id', None))
      if curricularUnit:
        
        #! Check if the user has a course
        if not request.user.profilemodel.course:
          return Response({'detail': 'You cannot request mentoring without a course.'}, status=status.HTTP_400_BAD_REQUEST)
        
        #TODO: Check if the courses of the curricular unit matches a course of the user
        
        serializer = MentoringRequestSerializer(data=request.data)
        if serializer.is_valid():
          serializer.save(mentee=request.user, curricularUnit=curricularUnit)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      else:
        return Response({'detail': 'Curricular Unit not found.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Curricular Unit JSON not found.'}, status=status.HTTP_400_BAD_REQUEST)

class MentoringViewSet(CreateAndViewModelViewSet, mixins.DestroyModelMixin):
  """
  API endpoint that allows mentorships to be viewed or edited.
  """
  queryset = MentoringModel.objects.all().prefetch_related('mentor', 'mentee', 'curricularUnit')
  serializer_class = MentoringSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentoringSerializer.Meta.fields
  pagination_class = None
  
  #* Limit so that is only possible to see the same user
  def get_queryset(self):
    return MentoringModel.objects.filter(mentor=self.request.user) | MentoringModel.objects.filter(mentee=self.request.user)

  #* Create Mentoring
  @transaction.atomic
  def create(self, request, *args, **kwargs):
    if 'requestId' not in self.request.data:
      return Response({'detail': 'Request ID not found.'}, status=status.HTTP_400_BAD_REQUEST)
    mentoringRequest = MentoringRequestModel.objects.get(id=self.request.data.get('requestId', None))

    if not mentoringRequest:
      return Response({'detail': 'Request not found.'}, status=status.HTTP_400_BAD_REQUEST)

    if mentoringRequest.mentee == request.user:
      return Response({'detail': 'You cannot mentor yourself.'}, status=status.HTTP_400_BAD_REQUEST)

    #TODO: check if the courses of the curricular unit matches one course of the user

    mentoring = MentoringModel.objects.create(mentee=mentoringRequest.mentee, mentor=request.user, curricularUnit=mentoringRequest.curricularUnit)
    mentoringRequest.delete()

    send_mail("Mentoring Accepted", f"Hey {mentoring.mentee.username}, {mentoring.mentor.username} accepted your mentoring request for {mentoring.curricularUnit.name}.", None, [mentoring.mentee.email, mentoring.mentor.email], fail_silently=False)
    
    return Response(MentoringSerializer(mentoring).data, status=status.HTTP_201_CREATED)

  def destroy(self, request, *args, **kwargs):
    mentoring = MentoringModel.objects.filter(id=request.data['id'])
    if mentoring.exists():
      mentoring = mentoring.first()
      #! Check if the user is the mentor or the mentee
      if mentoring.mentor != request.user and mentoring.mentee != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'You cannot delete this mentoring.'})
      mentoring.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

class BlogTopicViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows blog topics to be viewed.
  """
  queryset = BlogTopicModel.objects.all()
  serializer_class = BlogTopicSerializer
  permission_classes = []
  filterset_fields = BlogTopicSerializer.Meta.fields
  pagination_class = None

class BlogImageViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows blog images to be viewed.
  """
  queryset = BlogImageModel.objects.all()
  serializer_class = BlogImageSerializer
  permission_classes = []
  filterset_fields = ['name']
  pagination_class = None

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows blog posts to be viewed.
  """
  queryset = BlogPostModel.objects.all().order_by('-date').prefetch_related('images', 'topics', 'author')
  serializer_class = BlogPostSerializer
  permission_classes = []
  filterset_fields = BlogPostSerializer.Meta.fields
  pagination_class = None

class UserViewSet(CreateAndViewModelViewSet, mixins.UpdateModelMixin):
  """
  API endpoint that allows users to be viewed, created or edited.
  """
  queryset = User.objects.all().prefetch_related('profilemodel')
  serializer_class = UserSerializer
  permission_classes = []
  filterset_fields = ['id', 'username', 'first_name', 'last_name', 'email']
  pagination_class = None
  
  #* Limit so that is only possible to see the same user
  def get_queryset(self):
    return User.objects.filter(id=self.request.user.id)
  
  @transaction.atomic
  def create(self, request, *args, **kwargs):
    profile_data = request.data.pop('profilemodel', None)
    course_data = profile_data.pop('course', None)
    
    # check if email already exists
    if User.objects.filter(email=request.data.get('email')).exists():
      raise serializers.ValidationError({'email': 'A user with this email address is already registered.'})
    
    user = User.objects.create_user(**request.data)
    user.set_password(request.data.get('password'))
    user.is_active = False
    user.save()
    
    if profile_data:
      profile = ProfileModel.objects.create(user=user, **profile_data)

      if course_data:
        for course in course_data:
          course = CourseModel.objects.get(name=course['name'])
          profile.course.add(course)
      
      profile.save()

    # if user email is 8dddddd@estg.ipp.pt
    if re.match(r'^8[0-9]{6}@estg\.ipp\.pt$', user.email):
      #TODO: send email with activation link
      activation = UserActivationModel.objects.create(user=user)
      send_mail('NEI - Account Activation', "Please activate your account with the following code: " + activation.code, None, [user.email], fail_silently=False)
    
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
  
  #TODO: Adjust and test this method
  def update(self, request, *args, **kwargs):
    user = User.objects.get(id=request.user.id)
    profilemodel = request.data.pop('profilemodel', None)
    course_data = profilemodel.pop('course', None)
    user.first_name = request.data.get('first_name', user.first_name)
    user.last_name = request.data.get('last_name', user.last_name)
    user.username = request.data.get('username', user.username)
    user.email = request.data.get('email', user.email)
    user.save()
    if profilemodel:
      user.profilemodel.year = profilemodel.get('year', user.profilemodel.year)
      user.profilemodel.discord = profilemodel.get('discord', user.profilemodel.discord)
      user.profilemodel.save()
      
      if course_data:
        user.profilemodel.course.clear()
        for course in course_data:
          course = CourseModel.objects.get(name=course['name'])
          user.profilemodel.course.add(course)
    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
  
  def partial_update(self, request, *args, **kwargs):
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ChangePasswordView(APIView):
  """
  API endpoint that allows users to change their password.
  """
  permission_classes = [permissions.IsAuthenticated]
  
  def post(self, request, *args, **kwargs):
    user = request.user
    old_password = request.data.get("oldPassword")
    new_password = request.data.get("newPassword")
    if not user.check_password(old_password):
      return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
      validate_password(new_password, user=user)
    except ValidationError as e:
      return Response({"new_password": e.messages}, status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(new_password)
    user.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

class ResetPasswordView(APIView):
  """
  API endpoint that allows users to reset their password.
  """
  permission_classes = []
  
  #! Receive an username, if it matches send an email with a reset code
  @transaction.atomic
  def get(self, request, *args, **kwargs):
    username = request.query_params.get('username', None)
    if username:
      user = User.objects.filter(username=username)
      if user.exists():
        user = user.first()
        #! Check if a code already exists and if was created in the last minute, if not delete the code
        if UserResetModel.objects.filter(user=user).exists():
          reset = UserResetModel.objects.get(user=user)
          if (datetime.datetime.now(timezone.utc) - reset.date).seconds > 60:
            reset.delete()
          else:
            return Response({'detail': 'You already requested a reset code.'}, status=status.HTTP_400_BAD_REQUEST)
        reset = UserResetModel.objects.create(user=user)
        send_mail('NEI - Reset Password', f"Please reset your password with the following code: {reset.code}", None, [user.email], fail_silently=True)
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  #! Receive an username and a reset code and password, if it matches reset the password
  @transaction.atomic
  def post(self, request, *args, **kwargs):
    username = request.data.get('username', None)
    code = request.data.get('code', None)
    password = request.data.get('password', None)
    if username and code and password:
      user = User.objects.filter(username=username)
      if user.exists():
        user = user.first()
        reset = UserResetModel.objects.filter(user=user, code=code)
        if reset.exists():
          reset = reset.first()
          
          #! Check if the code was created in the last 5 minutes
          if (datetime.datetime.now(timezone.utc) - reset.first().date).seconds > 300:
            return Response({'detail': 'The code is expired.'}, status=status.HTTP_400_BAD_REQUEST)
          
          user.set_password(password)
          user.save()
          reset.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class UserActivationView(APIView):
  """
  API endpoint that allows users to activate their account.
  """
  permission_classes = []
  
  #! Receive an username, if it matches send an email with an activation code
  @transaction.atomic
  def get(self, request, *args, **kwargs):
    username = request.query_params.get('username', None)
    if username:
      user = User.objects.filter(username=username)
      if user.exists():
        user = user.first()
        
        #! Check if the user is already active
        if user.is_active:
          return Response(status=status.HTTP_204_NO_CONTENT)
        
        #! Check if the user email matches a student email
        if not re.match(r'^8[0-9]{6}@estg\.ipp\.pt$', user.email):
          return Response({'detail': 'You cannot activate this account.'}, status=status.HTTP_400_BAD_REQUEST)
        
        #! Check if a code already exists and if was created in the last minute, if not delete the code
        if UserActivationModel.objects.filter(user=user).exists():
          activation = UserActivationModel.objects.get(user=user)
          if (datetime.datetime.now(timezone.utc) - activation.date).seconds > 60:
            activation.delete()
          else:
            return Response({'detail': 'You already requested an activation code.'}, status=status.HTTP_400_BAD_REQUEST)
        
        activation = UserActivationModel.objects.create(user=user)
        send_mail('NEI - Account Activation', f"Please activate your account with the following code: {activation.code}", None, [user.email], fail_silently=True)
    return Response(status=status.HTTP_204_NO_CONTENT)
    
  #! Receive an activation code, if it matches activate the account
  @transaction.atomic
  def post(self, request, *args, **kwargs):
    username = request.data.get('username', None)
    if username:
      user = User.objects.filter(username=username)
      if user.exists():
        user = user.first()
        code = request.data.get('code', None)
        if code:
          activation = UserActivationModel.objects.filter(user=user, code=code)
          if activation.exists():
            activation = activation.first()
            
            #! Check if the code was created in the last 5 minutes
            if (datetime.datetime.now(timezone.utc) - activation.date).seconds > 300:
              return Response({'detail': 'The code is expired.'}, status=status.HTTP_400_BAD_REQUEST)
            
            activation.user.is_active = True
            activation.user.save()
            activation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
