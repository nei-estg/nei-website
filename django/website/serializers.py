from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password

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

class MentoringSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorshipModel
    fields = '__all__'

class MentoringReviewSerializer(serializers.ModelSerializer):
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

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProfileModel
    fields = ['course', 'year', 'image', 'bio']

class UserSerializer(serializers.ModelSerializer):
  profilemodel = ProfileSerializer(required=False)
  class Meta:
    model = User
    fields = '__all__'
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
