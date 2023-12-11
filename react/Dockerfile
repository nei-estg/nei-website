FROM node:21.4-bullseye-slim
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest typescript vite && npm install
EXPOSE 5173
CMD ["/bin/bash", "/app/entrypoint.sh"]
