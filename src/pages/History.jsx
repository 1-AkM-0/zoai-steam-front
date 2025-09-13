import ErrorCard from "../components/ErrorCard";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function History() {
  const { authGetRequest, authDeleteJoke } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null)

  const handleDelete = async (id) => {
    try {
      await authDeleteJoke(id);
      setHistory(history.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.error)
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await authGetRequest("/jokes");
        setHistory(response.data.jokes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  }, [authGetRequest]);
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Histórico de respostas</h2>
        {history.length === 0 ? (
          <p className="text-zinc-400">Nenhuma resposta ainda</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow flex justify-between items-start hover:bg-zinc-700 transition-colors"
            >
              <span className="text-sm text-zinc-200 max-w-[85%] leading-snug">
                {typeof item === "string" ? item : JSON.stringify(item.content)}
              </span>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-500/10"
                aria-label={`Excluir item ${index + 1}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
        {error && (<ErrorCard error={error} />)}
      </div>
    </div>
  );
}
