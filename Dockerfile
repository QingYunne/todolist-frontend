FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_APP_URL
ENV VITE_APP_URL=$VITE_APP_URL


COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]