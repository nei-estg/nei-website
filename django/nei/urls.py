from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path('', include('website.urls')),
    path('nei/', admin.site.urls),
    path('openapi/', get_schema_view(
        title="NEI",
        description="NEI API",
        version="1.0.0"
    ), name='openapi-schema'),
    path('prometheus/', include('django_prometheus.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
