FROM python:latest
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 8000
WORKDIR /app
RUN adduser --system --no-create-home nonroot && pip install --upgrade pip --no-cache-dir
COPY ./django /app
RUN pip install -r requirements.txt --no-cache-dir
USER nonroot
CMD ["/bin/bash", "-c", "python manage.py migrate; python manage.py runserver 0.0.0.0:8000"]
