export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a CyberApp</h1>
      <a href="/login" className="text-blue-500 underline">Entrar</a>
    </div>
  );
}
