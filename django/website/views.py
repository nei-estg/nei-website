from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from .models import *
from .serializers import *

class ContactViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows people to contact us.
  """
  queryset = ContactModel.objects.all()
  serializer_class = ContactSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'email', 'subject', 'message']

class FAQViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows FAQs to be viewed or edited.
  """
  queryset = FAQModel.objects.all()
  serializer_class = FAQSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['question', 'answer']
  
class CourseViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows courses to be viewed or edited.
  """
  queryset = CourseModel.objects.all()
  serializer_class = CourseSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'abbreviation']
  
class CurricularUnitViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows curricular units to be viewed or edited.
  """
  queryset = CurricularUnitModel.objects.all()
  serializer_class = CurricularUnitSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'abbreviation', 'course', 'year']
  
class MaterialTagViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material tags to be viewed or edited.
  """
  queryset = MaterialTagModel.objects.all()
  serializer_class = MaterialTagSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
class MaterialViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows materials to be viewed or edited.
  """
  queryset = MaterialModel.objects.all()
  serializer_class = MaterialSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name', 'tags']
  
class MaterialLinkViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows material links to be viewed or edited.
  """
  queryset = MaterialLinkModel.objects.all()
  serializer_class = MaterialLinkSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
class CalendarViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows calendars to be viewed or edited.
  """
  queryset = CalendarModel.objects.all()
  serializer_class = CalendarSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['name']
  
class MentorshipRequestViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows mentorship requests to be viewed or edited.
  """
  queryset = MentorshipRequestModel.objects.all()
  serializer_class = MentorshipRequestSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_fields = ['mentee', 'curricular_unit']
  
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
