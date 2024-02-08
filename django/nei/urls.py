from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from rest_framework.schemas import get_schema_view

urlpatterns = [
  path('hello/', lambda request: HttpResponse('Hello World!')),
  path('prometheus/', include('django_prometheus.urls')),
  path('api/', include('website.urls')),
  path('api/nei/', admin.site.urls),
]

if settings.DEBUG:
  urlpatterns.append(path('api/openapi/', get_schema_view(
      title="NEI",
      description="NEI API",
      version="1.0.0"
    ), name='openapi-schema'))
