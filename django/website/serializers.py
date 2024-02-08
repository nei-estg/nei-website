from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseModel
    fields = ['id', 'name', 'abbreviation']

class ProfileSerializer(serializers.ModelSerializer):
  course = CourseSerializer(many=True)

  class Meta:
    model = ProfileModel
    fields = ['course', 'year', 'image', 'bio']

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
  def create(self, validated_data): #TODO: Test this
    validated_data['password'] = make_password(validated_data.get('password'))
    profile_data = validated_data.pop('profilemodel', None)
    course_data = profile_data.pop('course', None) if profile_data else None

    user = super().create(validated_data)

    if profile_data:
      profile = ProfileModel.objects.get(user=user)
      profile_serializer = ProfileSerializer(profile, data=profile_data)
      profile_serializer.is_valid(raise_exception=True)
      profile_serializer.save()

      if course_data:
        profile.course.set(course_data)

    return user

  @transaction.atomic
  def update(self, user, validated_data): #TODO: Test this
    validated_data['password'] = make_password(validated_data.get('password'))
    profile_data = validated_data.pop('profilemodel', None)
    course_data = profile_data.pop('course', None) if profile_data else None

    user = super(UserSerializer, self).update(user, validated_data)

    if profile_data:
      profile = ProfileModel.objects.get(user=user)
      profile_serializer = ProfileSerializer(profile, data=profile_data)
      profile_serializer.is_valid(raise_exception=True)
      profile_serializer.save()

      if course_data:
        profile.course.set(course_data)

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
  category = FAQCategorySerializer()
  class Meta:
    model = FAQModel
    fields = ['question', 'answer', 'category']

class CurricularUnitSerializer(serializers.ModelSerializer):
  course = CourseSerializer(many=True)
  class Meta:
    model = CurricularUnitModel
    fields = '__all__'

class MaterialTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialTagModel
    fields = ['name']

class MaterialSerializer(serializers.ModelSerializer):
  tags = MaterialTagSerializer(many=True)
  curricularUnit = CurricularUnitSerializer()
  class Meta:
    model = MaterialModel
    fields = ['name', 'file', 'link', 'tags', 'curricularUnit', 'date']

class CalendarSerializer(serializers.ModelSerializer):
  curricularUnit = CurricularUnitSerializer(required=False)
  class Meta:
    model = CalendarModel
    fields = ['name', 'startDate', 'endDate', 'description', 'curricularUnit', 'place']

class MentoringRequestSerializer(serializers.ModelSerializer):
  mentee = UserSerializer(read_only=True)
  curricularUnit = CurricularUnitSerializer(read_only=True)
  class Meta:
    model = MentoringRequestModel
    fields = ['mentee', 'curricularUnit', 'date']

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
    fields = ['title', 'description', 'content', 'images', 'topics', 'author', 'date']
