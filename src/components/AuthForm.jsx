import { useState } from "react";

export function AuthForm({ title, buttonText, onSubmit, initialValues }) {
  const [username, setUsername] = useState(initialValues?.username || "");
  const [password, setPassword] = useState(initialValues?.password || "")

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit({ username, password })
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 text-white ">
      <div className="border-b-amber-800 mb-4 text-2xl">

        <h1>{title}</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
        method="POST"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 text-white w-full:"
        />
        <input

          type='password'
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 text-white w-full:"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-bold"
        >
          {buttonText}
        </button>
      </form>

    </div>

  )
}
