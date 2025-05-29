# ETAPA 1: Construcción (Build)
FROM node:20-bullseye as paso_desarrollo
WORKDIR /app
COPY package*.json ./
# Usamos 'npm ci' que es mejor para builds consistentes en CI/CD
RUN npm ci 
COPY . .
RUN npm run build

# ETAPA 2: Producción
FROM nginx:1.25.2-alpine as paso_produccion
# Copiamos los archivos construidos al directorio de Nginx
COPY --from=paso_desarrollo /app/dist /usr/share/nginx/html
# (Opcional) Si necesitas una config Nginx personalizada, la copiarías aquí.
# COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Nginx por defecto escucha en el puerto 80, así que lo exponemos.
EXPOSE 80 

# Comando para iniciar Nginx en primer plano (necesario para Docker)
CMD ["nginx","-g", "daemon off;"]