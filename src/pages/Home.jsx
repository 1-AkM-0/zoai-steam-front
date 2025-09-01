import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
export default function Home() {
  const { refreshTokens, getAccessToken, authRequest } = useContext(AuthContext)
  const [profileUrl, setProfileUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const isExpiring = (token) => {
    const decode = jwtDecode(token)
    const now = Date.now() / 1000
    return decode.exp - now < 60
  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!profileUrl) return;
    setLoading(true);
    if (getAccessToken()) {
      if (isExpiring(getAccessToken())) {
        await refreshTokens()
      }
    }
    try {
      const res = await authRequest('/jokes', { profileUrl })

      setResponse(res.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
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
            className="bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-bold"
          >
            {loading ? "Processando..." : "Zuar Perfil"}
          </button>
        </form>
        <div className="mt-6 w-full max-w-md">
          <div className="bg-zinc-800 rounderd-lg p-6 border border-zinc-700 shadow-lg min-h-[100px] flex items-center justify-center">
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
