import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // ✅ solo esta línea es necesaria

export default function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get('https://cyberapp-backend.onrender.com/api/challenges')
      .then((res) => setChallenges(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Retos disponibles</h1>
      <ul className="space-y-4">
        {challenges.map(ch => (
          <li key={ch._id} className="border p-4">
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              <Link href={`/challenges/${ch._id}`}>
                {ch.title}
              </Link>
            </h2>
            <p>{ch.description}</p>
            <p className="text-sm text-gray-500">{ch.points} puntos</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
