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
  #course = CourseSerializer()
  
  class Meta:
    model = ProfileModel
    fields = ['course', 'year', 'image', 'bio']

class UserSerializer(serializers.ModelSerializer):
  profilemodel = ProfileSerializer()
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', 'profilemodel']
    extra_kwargs = {
      'password': {'write_only': True},
      'last_login': {'read_only': True},
      'is_superuser': {'read_only': True},
      'is_staff': {'read_only': True},
      'is_active': {'read_only': True},
      'date_joined': {'read_only': True},
      'groups': {'read_only': True},
      'user_permissions': {'read_only': True}
    }

  @transaction.atomic
  def create(self, validated_data):
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
    fields = ['id', 'name', 'email', 'subject', 'message']
    
class FAQCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = FAQCategoryModel
    fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
  category = FAQCategorySerializer()
  class Meta:
    model = FAQModel
    fields = '__all__'
    
  def create(self, validated_data):
    category_data = validated_data.pop('category')
    category = FAQCategoryModel.objects.get_or_create(**category_data)[0]
    faq = FAQModel.objects.create(category=category, **validated_data)
    return faq

class CurricularUnitSerializer(serializers.ModelSerializer):
  #course = CourseSerializer()
  class Meta:
    model = CurricularUnitModel
    fields = '__all__'

class MaterialTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaterialTagModel
    fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
  tags = MaterialTagSerializer
  class Meta:
    model = MaterialModel
    fields = ['name', 'file', 'link', 'tags', 'curricularUnit']

class CalendarSerializer(serializers.ModelSerializer):
  curricularUnit = CurricularUnitSerializer()
  class Meta:
    model = CalendarModel
    fields = '__all__'

class MentorshipRequestSerializer(serializers.ModelSerializer):
  mentee = UserSerializer()
  curricularUnit = CurricularUnitSerializer()
  class Meta:
    model = MentoringRequestModel
    fields = ['mentee', 'curricularUnit']

class MentoringSerializer(serializers.ModelSerializer):
  mentor = UserSerializer()
  mentee = UserSerializer()
  curricularUnit = CurricularUnitSerializer()
  class Meta:
    model = MentoringModel
    fields = '__all__'

class MentoringReviewSerializer(serializers.ModelSerializer):
  mentoring = MentoringSerializer()
  class Meta:
    model = MentoringReviewModel
    fields = ['mentoring', 'rating', 'comment']

class BlogTopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogTopicModel
    fields = '__all__'

class BlogImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogImageModel
    fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
  images = BlogImageSerializer()
  topics = BlogTopicSerializer()
  author = UserSerializer()
  class Meta:
    model = BlogPostModel
    fields = '__all__'