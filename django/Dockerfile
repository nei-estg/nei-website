FROM python:3.10.14
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN pip install --upgrade pip --no-cache-dir
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt --no-cache-dir && \
    python manage.py collectstatic --noinput
EXPOSE 8000
CMD find ./website/migrations/ -type f ! -name '__init__.py' -exec rm -f '{}' \; && \
    pip install -r requirements.txt --no-cache-dir && \
    python manage.py makemigrations --noinput && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000
