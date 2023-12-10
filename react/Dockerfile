FROM node:21.4-slim
WORKDIR /app
COPY . /app
RUN adduser --disabled-password --gecos "" nonroot && \
    npm install -g npm@latest
USER nonroot
EXPOSE 5173
CMD ["/bin/bash", "/app/entrypoint.sh"]
