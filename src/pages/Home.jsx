import { TriangleAlert } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ErrorCard from "../components/ErrorCard";

export default function Home() {
  const { refreshTokens, getAccessToken, authRequest } =
    useContext(AuthContext);
  const [profileUrl, setProfileUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileUrl) {
      setError("Por favor, cole a URL do perfil da Steam.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await authRequest("/jokes", { profileUrl });

      setResponse(res.data);
      setLoading(false);
    } catch (err) {
      console.log(("Error", err.response));
      setError(err.response?.data?.error || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 text-white ">
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
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-bold"
          >
            {loading ? "Processando..." : "Zuar Perfil"}
          </button>
        </form>

        <div className="mt-6 w-full max-w-md">
          {error && <ErrorCard error={error} />}
          <div className="bg-zinc-800 rounderd-lg p-6 border border-zinc-700 shadow-lg min-h-[100px] flex items-center justify-center text-center">
            {loading ? (
              <p>A resposta aparecerá aqui</p>
            ) : response ? (
              <p>{response.joke}</p>
            ) : (
              <p className="text-zinc-400">A resposta aparecerá aqui</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
