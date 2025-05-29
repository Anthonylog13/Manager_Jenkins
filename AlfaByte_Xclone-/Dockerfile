FROM node:20-bullseye

WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias (usando 'npm ci' si tienes package-lock.json)
RUN npm ci

# Copiamos el resto del código de la aplicación
COPY . .

# Exponemos el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
