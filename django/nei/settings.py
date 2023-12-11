import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', '')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# SECURITY WARNING: only allow requests from the domain in production!
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

if DEBUG:
  ALLOWED_HOSTS += ['*']
else:
  ALLOWED_HOSTS += [os.environ.get('ALLOWED_HOST', '')]

# Application definition

INSTALLED_APPS = [
  'admin_interface',
  'colorfield',
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'django_extensions',
  'rest_framework',
  'django_filters',
  'knox',
  'django_prometheus',
  'website'
]

MIDDLEWARE = [
  'django_prometheus.middleware.PrometheusBeforeMiddleware',
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
  'django_prometheus.middleware.PrometheusAfterMiddleware',
]

ROOT_URLCONF = 'nei.urls'

TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
      'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
      ],
    },
  },
]

WSGI_APPLICATION = 'nei.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django_prometheus.db.backends.postgresql',
    'NAME': os.environ.get("POSTGRES_DB", ''),
    'USER': os.environ.get("POSTGRES_USER", ''),
    'PASSWORD': os.environ.get("POSTGRES_PASSWORD", ''),
    'HOST': 'postgres',
    'PORT': '5432'
  }
}

# Cache
# https://docs.djangoproject.com/en/4.2/topics/cache/#redis

CACHES = {
  "default": {
    "BACKEND": "django_prometheus.cache.backends.redis.RedisCache",
    "LOCATION": "redis://redis:6379",
  }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
  {
    'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
  },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'pt-PT'

TIME_ZONE = 'Europe/Lisbon'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

# NOTE: Static and Media files have to be served by eg. nginx in production

STATICFILES_DIRS = (
  os.path.join(BASE_DIR, 'static'),
)

STATIC_URL = "/static/"

STATIC_ROOT = '/shared/static'

MEDIA_URL = "/media/"

MEDIA_ROOT = '/shared/media'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
  'DEFAULT_THROTTLE_CLASSES': [
    'rest_framework.throttling.AnonRateThrottle',
    'rest_framework.throttling.UserRateThrottle'
  ],
  'DEFAULT_THROTTLE_RATES': {
    'anon': '100/hour',
    'user': '1000/hour'
  },
  'DEFAULT_AUTHENTICATION_CLASSES': [
    'knox.auth.TokenAuthentication'
  ],
  'DEFAULT_RENDERER_CLASSES': [
    'rest_framework.renderers.JSONRenderer',
  ],
  'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
  'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
  'PAGE_SIZE': 10
}

if DEBUG:
  REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += ['rest_framework.renderers.BrowsableAPIRenderer']
  REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES'] += ['rest_framework.authentication.BasicAuthentication']
  REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES'] += ['rest_framework.authentication.SessionAuthentication']

LOGIN_REDIRECT_URL = '/api'

LOGOUT_REDIRECT_URL = '/api'
