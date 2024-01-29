from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

class CreateOnlyModelViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
  pass

class ContactViewSet(CreateOnlyModelViewSet):
  """
  API endpoint that allows people to contact us.
  """
  queryset = ContactModel.objects.all()
  serializer_class = ContactSerializer
  permission_classes = []
  filterset_fields = ContactSerializer.Meta.fields

class FAQViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows FAQs to be viewed.
  """
  queryset = FAQModel.objects.all()
  serializer_class = FAQSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = FAQSerializer.Meta.fields

class CalendarViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows calendars to be viewed or edited.
  """
  queryset = CalendarModel.objects.all()
  serializer_class = CalendarSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = CalendarSerializer.Meta.fields

class CourseViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows courses to be viewed.
  """
  queryset = CourseModel.objects.all()
  serializer_class = CourseSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = CourseSerializer.Meta.fields

class CurricularUnitViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows curricular units to be viewed.
  """
  queryset = CurricularUnitModel.objects.all()
  serializer_class = CurricularUnitSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = CurricularUnitSerializer.Meta.fields

class MaterialTagViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material tags to be viewed.
  """
  queryset = MaterialTagModel.objects.all()
  serializer_class = MaterialTagSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MaterialTagSerializer.Meta.fields

class MaterialViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows materials to be viewed or edited.
  """
  queryset = MaterialModel.objects.all()
  serializer_class = MaterialSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = ['name', 'tags', 'curricular_unit']

class MaterialLinkViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material links to be viewed or edited.
  """
  queryset = MaterialLinkModel.objects.all()
  serializer_class = MaterialLinkSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MaterialLinkSerializer.Meta.fields

class MentorshipRequestViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship requests to be viewed or edited.
  """
  queryset = MentorshipRequestModel.objects.all()
  serializer_class = MentorshipRequestSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentorshipRequestSerializer.Meta.fields

  def create(self, request, *args, **kwargs):
    if isinstance(self.request.data, dict):
      self.request.data._mutable = True
    self.request.data['mentee'] = request.user.id
    return super().create(request, *args, **kwargs)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser or request.user == self.get_object().mentee:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

class MentorshipViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorships to be viewed or edited.
  """
  queryset = MentorshipModel.objects.all()
  serializer_class = MentorshipSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentorshipSerializer.Meta.fields

class MentorshipReviewViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship reviews to be viewed or edited.
  """
  queryset = MentorshipReviewModel.objects.all()
  serializer_class = MentorshipReviewSerializer
  permission_classes = [permissions.DjangoObjectPermissions]
  filterset_fields = MentorshipReviewSerializer.Meta.fields

class BlogTopicViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog topics to be viewed or edited.
  """
  queryset = BlogTopicModel.objects.all()
  serializer_class = BlogTopicSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = BlogTopicSerializer.Meta.fields

class BlogImageViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog images to be viewed or edited.
  """
  queryset = BlogImageModel.objects.all()
  serializer_class = BlogImageSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = ['id', 'name']

class BlogPostViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog posts to be viewed or edited.
  """
  queryset = BlogPostModel.objects.all()
  serializer_class = BlogPostSerializer
  permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
  filterset_fields = BlogPostSerializer.Meta.fields

class UserViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows users to be viewed or edited.
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = []
  filterset_fields = ['id', 'username', 'first_name', 'last_name', 'email']
  
  #TODO: Limit access to this ViewSet
