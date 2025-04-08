# Aplicación CRUD de Productos

Esta es una aplicación simple que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para una tabla de productos con los campos id, nombre, precio, stock y estado.

## Estructura del Proyecto

```
productos-crud-app/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Dependencias y scripts
├── productos.db           # Base de datos SQLite (se crea automáticamente)
├── public/                # Archivos estáticos
│   └── index.html         # Interfaz web
├── Dockerfile             # Configuración para crear imagen Docker
├── docker-compose.yml     # Configuración para Docker Compose
└── README.md              # Este archivo
```

## Requisitos

- Node.js v14 o superior (para desarrollo local)
- Docker y Docker Compose (para ejecución con contenedores)

## Instalación y Uso

### Desarrollo Local

1. Clona este repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd productos-crud-app
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia la aplicación:
   ```
   npm start
   ```
   
   O en modo desarrollo con recarga automática:
   ```
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

### Usando Docker

1. Construye y ejecuta con Docker Compose:
   ```
   docker-compose up -d
   ```

2. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

3. Para detener los contenedores:
   ```
   docker-compose down
   ```

## API REST

La aplicación expone los siguientes endpoints:

- `GET /api/productos`: Obtiene todos los productos
- `GET /api/productos/:id`: Obtiene un producto por su ID
- `POST /api/productos`: Crea un nuevo producto
- `PUT /api/productos/:id`: Actualiza un producto existente
- `DELETE /api/productos/:id`: Elimina un producto

## Formato de los datos

Ejemplo de un objeto producto:

```json
{
  "id": 1,
  "nombre": "Laptop",
  "precio": 1200.50,
  "stock": 10,
  "estado": "Activo"
}
```

## Persistencia de datos

La aplicación utiliza SQLite como base de datos, almacenada en el archivo `productos.db`. Este archivo se mantiene persistente incluso cuando se usa Docker gracias al volumen configurado en el archivo `docker-compose.yml`.