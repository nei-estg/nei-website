FROM node:21.4-slim as build
WORKDIR /app
COPY ./react /app
RUN npm install -g typescript vite && npm install && npm run build

FROM nginx:1.25.3-alpine
COPY --from=build /app/dist /build/react
COPY ./nginx/nginx-prod.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
