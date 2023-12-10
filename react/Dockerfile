FROM node:21.4-slim
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
EXPOSE 5173
CMD ["/bin/bash", "/app/entrypoint.sh"]
