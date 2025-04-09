# productos-crud-app/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos de la aplicación
COPY . .

# Exponer el puerto usado por la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]