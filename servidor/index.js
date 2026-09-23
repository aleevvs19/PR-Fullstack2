const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const db = new Database('datos.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    mensaje TEXT,
    creado TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/contactos', (req, res) => {
  res.json(db.prepare('SELECT * FROM contactos ORDER BY id DESC').all());
});

app.post('/api/contactos', (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }
  const info = db
    .prepare('INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)')
    .run(nombre, correo, mensaje ?? '');
  res.status(201).json({ id: info.lastInsertRowid });
});

app.delete('/api/contactos/:id', (req, res) => {
  db.prepare('DELETE FROM contactos WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.listen(3001, () => console.log('API en http://localhost:3001'));