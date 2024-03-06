from django.db import IntegrityError
from rest_framework.views import Response, exception_handler
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

def custom_exception_handler(exc, context):
  # Call REST framework's default exception handler first to get the standard error response.
  response = exception_handler(exc, context)

  # if there is an IntegrityError and the error response hasn't already been generated
  if isinstance(exc, IntegrityError) and not response:
    response = Response(
      {
        'detail': "IntegrityError occurred. Please check if the data you are trying to insert already exists. If you're dealing with dates check if start date is not after end date"
      },
      status=status.HTTP_400_BAD_REQUEST
    )
  elif isinstance(exc, ObjectDoesNotExist) and not response:
    response = Response(
      {
        'detail': "DoesNotExist error occurred. Please check if the data you are trying to access exists"
      },
      status=status.HTTP_404_NOT_FOUND
    )
  return response
