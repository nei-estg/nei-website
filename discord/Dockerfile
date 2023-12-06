FROM python:latest
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN pip install --upgrade pip --no-cache-dir
COPY . /app
RUN pip install -r requirements.txt --no-cache-dir
CMD ["/bin/bash", "-c", "python bot.py"]
