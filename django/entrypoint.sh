#!/bin/bash

# Remove Old Migrations Files
find ./website/migrations/ -type f ! -name '__init__.py' -exec rm -f '{}' \;

# Create the Migrations for the Database
python manage.py makemigrations --noinput

# Apply the Migrations in the Database
python manage.py migrate

# Install Requirements
pip install -r requirements.txt --no-cache-dir

# Run Django
python manage.py runserver 0.0.0.0:8000
