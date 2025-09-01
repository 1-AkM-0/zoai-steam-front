import { useEffect, useState } from "react"
import api from "../api/api"
import { Trash2 } from "lucide-react"

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/jokes')
        setHistory(response.data.jokes)
        console.log(response.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchHistory()
  }, [])
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full max-w-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Histórico de respostas</h2>
        {history.length === 0 ? <p className="text-zinc-400">Nenhuma resposta ainda</p> : history.map((item, index) => (
          <div key={index} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow flex justify-between items-center hover:bg-zinc-700 transition-colors">
            <span className="text-sm text-zinc-200 max-w-[85%] leading-snug">
              {typeof item === "string" ? item : JSON.stringify(item.content)}
            </span>

            <button className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-500/10" aria-label={`Excluir item ${index + 1}`}>

              <Trash2 size={18} />

            </button>
          </div>
        ))}

      </div>
    </div>
  )

}
