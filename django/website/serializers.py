from .models import *
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContactModel
    fields = ['id', 'name', 'email', 'subject', 'message']
    
class FAQSerializer(serializers.ModelSerializer):
  class Meta:
    model = FAQModel
    fields = '__all__'
    
class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseModel
    fields = '__all__'
    
class CurricularUnitSerializer(serializers.ModelSerializer):
  class Meta:
    model = CurricularUnitModel
    fields = '__all__'
    
class MaterialTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialTagModel
    fields = '__all__'
    
class MaterialSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialModel
    fields = ['name', 'file', 'tags', 'curricular_unit']
    
class MaterialLinkSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialLinkModel
    fields = ['name', 'link', 'tags', 'curricular_unit']
    
class CalendarSerializer(serializers.ModelSerializer):
  class Meta:
    model = CalendarModel
    fields = '__all__'
    
class MentorshipRequestSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorshipRequestModel
    fields = ['mentee', 'curricular_unit']
    
class MentorshipSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorshipModel
    fields = '__all__'
    
class MentorshipReviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorshipReviewModel
    fields = ['mentee', 'mentor', 'curricular_unit', 'rating', 'comment']
    
class BlogTopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogTopicModel
    fields = '__all__'
    
class BlogImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogImageModel
    fields = '__all__'
    
class BlogPostSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogPostModel
    fields = '__all__'
