from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import base64

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
  filterset_fields = ContactSerializer.Meta.fields

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows FAQs to be viewed.
  """
  queryset = FAQModel.objects.all()
  serializer_class = FAQSerializer
  permission_classes = []
  filterset_fields = FAQSerializer.Meta.fields
  pagination_class = None

class CalendarViewSet(CreateAndViewModelViewSet):
  """
  API endpoint that allows calendar events to be viewed or created.
  """
  queryset = CalendarModel.objects.filter(visible=True)
  serializer_class = CalendarSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = CalendarSerializer.Meta.fields
  pagination_class = None
  
  def create(self, request, *args, **kwargs):
    #if isinstance(self.request.data, dict):
      #self.request.data._mutable = True
    self.request.data['visible'] = False
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

class CurricularUnitViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows curricular units to be viewed.
  """
  queryset = CurricularUnitModel.objects.all()
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
  queryset = MaterialModel.objects.filter(visible=True)
  serializer_class = MaterialSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = ['name', 'tags', 'curricularUnit']
  pagination_class = None
  
  #TODO: Add Create method
  
  def create(self, request, *args, **kwargs):
    fileJson = request.data.get('file', None)
    curricularUnitJson = request.data.get('curricularUnit', None)
    
    if not curricularUnitJson:
      return Response({'detail': 'Curricular Unit JSON not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    curricularUnit = CurricularUnitModel.objects.get(id=curricularUnitJson.get('id', None))
    
    if not curricularUnit:
      return Response({'detail': 'Curricular Unit not found.'}, status=status.HTTP_400_BAD_REQUEST)
    
    courses = curricularUnit.course.all()
    
    material = None

    if fileJson:
      decodedFile = base64.b64decode(fileJson)
      
      course = ""
      
      #if the curricular unit has more than one course it should be Abbreviation + Abbreviation + ...
      if len(courses) > 1:
        course = " + ".join([course.abbreviation for course in courses])
      else:
        course = courses[0].abbreviation
      
      filePath = f"{course}/{curricularUnit.abbreviation}/{request.user.username}/{request.data.get('name', 'file')}"
      
      default_storage.save(filePath, ContentFile(decodedFile))
      
      material = MaterialModel.objects.create(name=request.data.get('name', ''), file=filePath, curricularUnit=curricularUnit)
    else:
      material = MaterialModel.objects.create(name=request.data.get('name', ''), link=request.data.get('link', ''), curricularUnit=curricularUnit)
      
    return Response(material, status=status.HTTP_201_CREATED)


class MentoringRequestViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship requests to be viewed or edited.
  """
  queryset = MentoringRequestModel.objects.all()
  serializer_class = MentoringRequestSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentoringRequestSerializer.Meta.fields

  #TODO: Test this methods and limit access to this ViewSet

  def create(self, request, *args, **kwargs):
    #if isinstance(self.request.data, dict):
      #self.request.data._mutable = True
    self.request.data['mentee'] = request.user.id
    return super().create(request, *args, **kwargs)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser or request.user == self.get_object().mentee:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

class MentoringViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorships to be viewed or edited.
  """
  queryset = MentoringModel.objects.all()
  serializer_class = MentoringSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentoringSerializer.Meta.fields
  
  #TODO: Add methods and limit access to this ViewSet

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
  filterset_fields = ['id', 'name']
  pagination_class = None

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows blog posts to be viewed.
  """
  queryset = BlogPostModel.objects.all()
  serializer_class = BlogPostSerializer
  permission_classes = []
  filterset_fields = BlogPostSerializer.Meta.fields

class UserViewSet(CreateAndViewModelViewSet):
  """
  API endpoint that allows users to be viewed or edited.
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = []
  filterset_fields = ['id', 'username', 'first_name', 'last_name', 'email']
  pagination_class = None
  
  #TODO: Add more limit access to this ViewSet
  
  #! Limit so that is only possible to see the same user
  def get_queryset(self):
    if self.request.user.is_superuser:
      return User.objects.all()
    return User.objects.filter(id=self.request.user.id)
