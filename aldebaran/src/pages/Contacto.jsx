import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api/contactos';

export default function Contacto() {
  // --- Cotización del dólar (tu código) ---
  const [dolar, setDolar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://cl.dolarapi.com/v1/cotizaciones/usd')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al conectar con la API');
        }
        return response.json();
      })
      .then((data) => {
        setDolar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- Formulario y base de datos ---
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [contactos, setContactos] = useState([]);

  const cargar = async () => {
    try {
      const res = await fetch(API);
      setContactos(await res.json());
    } catch {
      console.error('No se pudo conectar con el servidor');
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nombre: '', correo: '', mensaje: '' });
      cargar();
    }
  };

  return (
    <div className="container my-4">
      <h1>Contacto</h1>

      {/* Bloque del dólar */}
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }} className="mb-4">
        <h2>💵 Cotización del Dólar (Chile)</h2>
        {loading && <p>Cargando cotización...</p>}
        {error && <p>Hubo un error: {error}</p>}
        {dolar && (
          <div>
            <p><strong>Divisa:</strong> {dolar.nombre}</p>
            <p><strong>Compra:</strong> ${dolar.compra}</p>
            <p><strong>Venta:</strong> ${dolar.venta}</p>
            <small>Última actualización: {new Date(dolar.fechaActualizacion).toLocaleString()}</small>
          </div>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="mensaje" placeholder="Mensaje" value={form.mensaje} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>

      {/* Mensajes guardados */}
      <h2>Mensajes guardados</h2>
      <ul className="list-group">
        {contactos.map((c) => (
          <li key={c.id} className="list-group-item">
            <strong>{c.nombre}</strong> ({c.correo}): {c.mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
}