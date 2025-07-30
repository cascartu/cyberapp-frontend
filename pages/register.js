import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://cyberapp-backend.onrender.com/api/auth/register', form);
      window.location.href = '/login';
    } catch {
      setMessage('Error al registrar');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Crear cuenta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input name="username" placeholder="Usuario" onChange={handleChange} className="border p-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="border p-2" />
        <button className="bg-green-500 text-white p-2">Registrarse</button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
