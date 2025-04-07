FROM node:20-bullseye as paso_desarrollo
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

#ETAPA 2

FROM nginx:1.25.2-alpine as paso_produccion
COPY  --from=paso_desarrollo /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx","-g", "daemon off;"]