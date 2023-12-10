FROM python:3.12.1
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN pip install --upgrade pip --no-cache-dir
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt --no-cache-dir
EXPOSE 8000
CMD ["/bin/bash", "/app/entrypoint.sh"]
