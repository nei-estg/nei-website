FROM python:3.12.1
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app
RUN adduser --disabled-password --gecos "" nonroot
USER nonroot
EXPOSE 8000
CMD ["/bin/bash", "/app/entrypoint.sh"]
