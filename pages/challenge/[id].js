import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChallengeDetail() {
  const router = useRouter()
  const { id } = router.query

  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://cyberapp-backend.onrender.com/api/challenges/${id}`)
        .then((res) => setChallenge(res.data))
        .catch((err) => console.error(err))
    }
  }, [id])

  if (!challenge) return <p>Cargando reto...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
      <p className="mb-4">{challenge.description}</p>
      <p className="text-sm text-gray-600">Puntos: {challenge.points}</p>
    </div>
  )
}
