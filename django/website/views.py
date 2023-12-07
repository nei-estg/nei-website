from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

class ContactViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows people to contact us.
  """
  queryset = ContactModel.objects.all()
  serializer_class = ContactSerializer
  permission_classes = []
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'email', 'subject', 'message']
  
  def create(self, request, *args, **kwargs):
    return super().create(request, *args, **kwargs)
  
  def list(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().list(request, *args, **kwargs)
    return Response({'detail': 'Listing is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
  """
  API endpoint that allows FAQs to be viewed.
  """
  queryset = FAQModel.objects.all()
  serializer_class = FAQSerializer
  permission_classes = []
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['question', 'answer']
  
  def create(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().create(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class CourseViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows courses to be viewed.
  """
  queryset = CourseModel.objects.all()
  serializer_class = CourseSerializer
  permission_classes = []
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'abbreviation']
  
  def create(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().create(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class CurricularUnitViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows curricular units to be viewed.
  """
  queryset = CurricularUnitModel.objects.all()
  serializer_class = CurricularUnitSerializer
  permission_classes = []
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'abbreviation', 'course', 'year']
  
  def create(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().create(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class MaterialTagViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material tags to be viewed.
  """
  queryset = MaterialTagModel.objects.all()
  serializer_class = MaterialTagSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
  def create(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().create(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class MaterialViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows materials to be viewed or edited.
  """
  queryset = MaterialModel.objects.all()
  serializer_class = MaterialSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'tags']
  
  #TODO: Add CRUD methods for this resource.
  
class MaterialLinkViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material links to be viewed or edited.
  """
  queryset = MaterialLinkModel.objects.all()
  serializer_class = MaterialLinkSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
  #TODO: Add CRUD methods for this resource.
  
class CalendarViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows calendars to be viewed or edited.
  """
  queryset = CalendarModel.objects.all()
  serializer_class = CalendarSerializer
  permission_classes = []
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
  def create(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().create(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class MentorshipRequestViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship requests to be viewed or edited.
  """
  queryset = MentorshipRequestModel.objects.all()
  serializer_class = MentorshipRequestSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['mentee', 'curricular_unit']
  
  def create(self, request, *args, **kwargs):
    if isinstance(self.request.data, dict):
      self.request.data._mutable = True
    self.request.data['mentee'] = request.user.id
    return super().create(request, *args, **kwargs)
  
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def update(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().update(request, *args, **kwargs)
    return Response({'detail': 'Updates are not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)

  def destroy(self, request, *args, **kwargs):
    if request.user.is_superuser:
      return super().destroy(request, *args, **kwargs)
    elif request.user == self.get_object().mentee:
      return super().destroy(request, *args, **kwargs)
    return Response({'detail': 'Deletion is not allowed for this resource.'}, status=status.HTTP_403_FORBIDDEN)
  
class MentorshipViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorships to be viewed or edited.
  """
  queryset = MentorshipModel.objects.all()
  serializer_class = MentorshipSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['mentor', 'mentee', 'curricular_unit']
  
class MentorshipReviewViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship reviews to be viewed or edited.
  """
  queryset = MentorshipReviewModel.objects.all()
  serializer_class = MentorshipReviewSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['mentor', 'mentee', 'curricular_unit', 'rating']
  
class BlogTopicViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog topics to be viewed or edited.
  """
  queryset = BlogTopicModel.objects.all()
  serializer_class = BlogTopicSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
class BlogImageViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog images to be viewed or edited.
  """
  queryset = BlogImageModel.objects.all()
  serializer_class = BlogImageSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
class BlogPostViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows blog posts to be viewed or edited.
  """
  queryset = BlogPostModel.objects.all()
  serializer_class = BlogPostSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['title', 'content', 'author']
