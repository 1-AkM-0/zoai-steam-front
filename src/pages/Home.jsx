import { useState } from "react";
import api from "../api/api";

export default function Home() {
  const [profileUrl, setProfileUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileUrl) return;
    setLoading(true);
    try {
      const res = await api.post("/jokes", {
        profileUrl,
      });
      setResponse(res.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 text-white ">
      <h1 className="text-3xl font-bold mb-6">ZoAI Steam 🎮</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="url"
          placeholder="Cole a URL do perfil Steam"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 text-white w-full:"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-bold"
        >
          {loading ? "Processando..." : "Zuar Perfil"}
        </button>
      </form>
      <div className="mt-6 w-full max-w-md">
        <div className="bg-zinc-800 rounderd-lg p-6 border border-zinc-700 shadow-lg min-h-[100px] flex items-center justify-center">
          {loading ? (
            <p>Carregando resposta...</p>
          ) : response ? (
            <p>{response.joke}</p>
          ) : (
            <p className="text-zinc-400">A resposta aparecerá aqui</p>
          )}
        </div>
      </div>
    </div>
  );
}
