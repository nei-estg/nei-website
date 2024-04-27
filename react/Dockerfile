FROM node:21.7.3-bullseye-slim
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest typescript vite && npm install
EXPOSE 5173
CMD npm install; \
    npm run dev
