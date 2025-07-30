import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://cyberapp-backend.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
        <button className="bg-blue-500 text-white p-2">Entrar</button>
        {message && <p className="text-red-500">{message}</p>}
        <p className="text-sm mt-4">
          ¿No tienes cuenta? <a href="/register" className="text-blue-500 underline">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}
