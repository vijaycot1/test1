FROM node:alpine AS builder
EXPOSE 80
WORKDIR /app

COPY ZydusUI/. .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
