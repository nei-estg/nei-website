from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'contact', ContactViewSet)
router.register(r'faq', FAQViewSet)
router.register(r'course', CourseViewSet)
router.register(r'curricularUnit', CurricularUnitViewSet)
router.register(r'materialTag', MaterialTagViewSet)
router.register(r'material', MaterialViewSet)
router.register(r'materialLink', MaterialLinkViewSet)
router.register(r'calendar', CalendarViewSet)
router.register(r'mentorshipRequest', MentorshipRequestViewSet)
router.register(r'mentorship', MentorshipViewSet)
router.register(r'mentorshipReview', MentorshipReviewViewSet)
router.register(r'blogTopic', BlogTopicViewSet)
router.register(r'blogImage', BlogImageViewSet)
router.register(r'blogPost', BlogPostViewSet)

urlpatterns = [
  path('', include(router.urls)),
  path('auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('api/auth/', include('knox.urls')),
]
