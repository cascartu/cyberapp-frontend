import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChallengeDetail() {
  const [inputFlag, setInputFlag] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`https://cyberapp-backend.onrender.com/api/challenges/${id}`);
        setChallenge(res.data);
      } catch (err) {
        console.error('Error fetching challenge:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setValidationMessage('Necesitas iniciar sesión para validar el reto.');
      return;
    }

    try {
      const res = await axios.post(
        `https://cyberapp-backend.onrender.com/api/validate/${id}`,
        { flag: inputFlag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.alreadySolved) {
        setValidationMessage('✅ Ya habías resuelto este reto.');
        setSolved(true);
      } else if (res.data.success) {
        setValidationMessage('🎉 ¡Flag correcto! Reto superado.');
        setSolved(true);
      } else {
        setValidationMessage('❌ Flag incorrecto. Intenta de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setValidationMessage('⚠️ Error al validar el reto.');
    }
  };

  if (loading) return <p>Cargando reto...</p>;
  if (!challenge) return <p>No se encontró el reto.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
      <p className="mb-4">{challenge.description}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputFlag}
          onChange={(e) => setInputFlag(e.target.value)}
          placeholder="Tu respuesta aquí"
          className="border p-2 mb-2 block w-full"
          disabled={solved}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={solved}>
          Enviar
        </button>
      </form>

      {validationMessage && <p className="mt-4">{validationMessage}</p>}
    </div>
  );
}
