from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
  path('', include(router.urls)),
  path('auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('api/auth/', include('knox.urls')),
]
