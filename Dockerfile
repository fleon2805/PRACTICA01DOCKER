FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias con bandera --legacy-peer-deps para evitar problemas
RUN npm install --legacy-peer-deps

# Copiar el resto de la aplicación
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para iniciar
CMD ["node", "app.js"]