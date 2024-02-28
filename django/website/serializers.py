from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
import re

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseModel
    fields = ['name', 'abbreviation']

class ProfileSerializer(serializers.ModelSerializer):
  course = CourseSerializer(many=True, read_only=True)

  class Meta:
    model = ProfileModel
    fields = ['course', 'year', 'image']

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

  @transaction.atomic
  def create(self, validated_data):
    profile_data = validated_data.pop('profilemodel', None)
    course_data = profile_data.pop('course', None)
    
    # check if email already exists
    if User.objects.filter(email=validated_data.get('email')).exists():
      raise serializers.ValidationError({'email': 'A user with this email address is already registered.'})
    
    user = User.objects.create_user(**validated_data)
    user.set_password(validated_data.get('password'))
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
      pass
    
    return user

  @transaction.atomic
  def update(self, user, validated_data): #TODO: Test this
    profile_data = validated_data.pop('profilemodel', None)
    course_data = profile_data.pop('course', None)
    
    user.username = validated_data.get('username', user.username)
    user.email = validated_data.get('email', user.email)
    user.first_name = validated_data.get('first_name', user.first_name)
    user.last_name = validated_data.get('last_name', user.last_name)
    
    #check if password is being updated
    if 'password' in validated_data:
      #check if oldPassword is present
      if 'oldPassword' in validated_data:
        if user.check_password(validated_data.get('oldPassword')):
          user.set_password(validated_data.get('password'))
        else:
          raise serializers.ValidationError({'oldPassword': 'The old password is incorrect'})
    
    user.save()
    
    if profile_data:
      profile = user.profilemodel
      profile.year = profile_data.get('year', profile.year)
      profile.image = profile_data.get('image', profile.image)
      profile.bio = profile_data.get('bio', profile.bio)
      profile.save()

      if course_data:
        profile.course.clear()
        for course in course_data:
          course = CourseModel.objects.get(name=course['name'])
          profile.course.add(course)
      
      profile.save()
      
    return user


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
    fields = ['id', 'name', 'file', 'link', 'tags', 'curricularUnit', 'date']

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
