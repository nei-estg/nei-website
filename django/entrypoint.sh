#!/bin/bash

# Check if Virtual Environment exists and create it if it doesn't
if [ ! -d "/app/venv" ]; then
  python3 -m venv /app/venv
fi

# Change Ownership of the App Directory
chown -R 777 /app

# Activate Virtual Environment
source /app/venv/bin/activate

# Upgrade Pip
pip install --upgrade pip --no-cache-dir

# Install Requirements
pip install -r requirements.txt --no-cache-dir

# Remove Old MIgrations Files
find ./website/migrations/ -type f ! -name '__init__.py' -exec rm -f '{}' \;

# Create the Migrations for the Database
python manage.py makemigrations --noinput

# Apply the Migrations in the Database
python manage.py migrate

# Run Django
python manage.py runserver 0.0.0.0:8000
