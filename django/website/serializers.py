from .models import *
from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
import re
from django.core.mail import send_mail

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseModel
    fields = ['name', 'abbreviation']

class ProfileSerializer(serializers.ModelSerializer):
  course = CourseSerializer(many=True, read_only=True)

  class Meta:
    model = ProfileModel
    fields = ['course', 'year', 'image', 'discord']

class UserSerializer(serializers.ModelSerializer):
  profilemodel = ProfileSerializer()
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'last_login', 'is_staff', 'is_active', 'date_joined', 'profilemodel']
    extra_kwargs = {
      'password': {'write_only': True},
      'last_login': {'read_only': True},
      'is_staff': {'read_only': True},
      'is_active': {'read_only': True},
      'date_joined': {'read_only': True},
    }

class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContactModel
    fields = ['name', 'email', 'subject', 'message']

class FAQCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = FAQCategoryModel
    fields = ['name']

class FAQSerializer(serializers.ModelSerializer):
  category = FAQCategorySerializer(read_only=True)
  class Meta:
    model = FAQModel
    fields = ['question', 'answer', 'category']

class CurricularUnitSerializer(serializers.ModelSerializer):
  course = CourseSerializer(many=True, read_only=True)
  class Meta:
    model = CurricularUnitModel
    fields = '__all__'

class MaterialTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialTagModel
    fields = ['name']

class MaterialSerializer(serializers.ModelSerializer):
  tags = MaterialTagSerializer(many=True, read_only=True)
  curricularUnit = CurricularUnitSerializer(read_only=True)
  class Meta:
    model = MaterialModel
    fields = ['id', 'name', 'link', 'tags', 'curricularUnit', 'date']

class CalendarSerializer(serializers.ModelSerializer):
  curricularUnit = CurricularUnitSerializer(required=False, read_only=True)
  class Meta:
    model = CalendarModel
    fields = ['id', 'name', 'startDate', 'endDate', 'description', 'curricularUnit', 'place']
  
  def create(self, validated_data):
    validated_data['visible'] = False
    return super().create(validated_data)

class MentoringRequestSerializer(serializers.ModelSerializer):
  mentee = UserSerializer(read_only=True)
  curricularUnit = CurricularUnitSerializer(read_only=True)
  class Meta:
    model = MentoringRequestModel
    fields = ['id', 'mentee', 'curricularUnit', 'date']

class MentoringSerializer(serializers.ModelSerializer):
  mentor = UserSerializer(read_only=True)
  mentee = UserSerializer(read_only=True)
  curricularUnit = CurricularUnitSerializer(read_only=True)
  class Meta:
    model = MentoringModel
    fields = '__all__'

class BlogTopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogTopicModel
    fields = ['name']

class BlogImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogImageModel
    fields = ['name', 'image']

class BlogPostSerializer(serializers.ModelSerializer):
  images = BlogImageSerializer(many=True, read_only=True)
  topics = BlogTopicSerializer(many=True, read_only=True)
  author = UserSerializer(read_only=True)
  class Meta:
    model = BlogPostModel
    fields = ['slug', 'title', 'description', 'content', 'images', 'topics', 'author', 'date']
