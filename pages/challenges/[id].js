import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChallengeDetail() {
  const [inputFlag, setInputFlag] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const router = useRouter()
  const { id } = router.query
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!id) return
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`https://cyberapp-backend.onrender.com/api/challenges/${id}`)
        setChallenge(res.data)
      } catch (err) {
        console.error('Error fetching challenge:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchChallenge()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://cyberapp-backend.onrender.com/api/challenges/${challenge._id}/validate`,
        { flag: inputFlag }
      );
      setValidationMessage(res.data.message);
    } catch (err) {
      setValidationMessage('Error al validar el reto.');
    }
  };

  if (loading) return <p>Cargando reto...</p>
  if (!challenge) return <p>No se encontró el reto.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
      <p className="mb-4">{challenge.description}</p>
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          value={inputFlag}
          onChange={(e) => setInputFlag(e.target.value)}
          placeholder="Introduce tu solución"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Enviar
        </button>
      </form>
      {validationMessage && (
        <p className="mt-4 font-semibold">{validationMessage}</p>
      )}
    </div>
  )
}
