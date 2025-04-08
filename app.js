// productos-crud-app/app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

// Crear app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar base de datos SQLite
const db = new sqlite3.Database('./productos.db', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
    // Crear tabla productos si no existe
    db.run(`CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL,
      estado TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creando tabla productos', err.message);
      } else {
        console.log('Tabla productos creada o ya existente');
      }
    });
  }
});

// Rutas API

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.all('SELECT * FROM productos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(row);
  });
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, stock, estado } = req.body;
  
  if (!nombre || precio === undefined || stock === undefined || !estado) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return;
  }
  
  const sql = 'INSERT INTO productos (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
  db.run(sql, [nombre, precio, stock, estado], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({
      id: this.lastID,
      nombre,
      precio,
      stock,
      estado
    });
  });
});

// Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, precio, stock, estado } = req.body;
  
  if (!nombre || precio === undefined || stock === undefined || !estado) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return;
  }
  
  const sql = 'UPDATE productos SET nombre = ?, precio = ?, stock = ?, estado = ? WHERE id = ?';
  db.run(sql, [nombre, precio, stock, estado, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    
    res.json({
      id: parseInt(id),
      nombre,
      precio,
      stock, 
      estado
    });
  });
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM productos WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    
    res.json({ message: 'Producto eliminado correctamente' });
  });
});

// Ruta principal para la interfaz web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Manejar cierre del servidor
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Base de datos cerrada');
    process.exit(0);
  });
});