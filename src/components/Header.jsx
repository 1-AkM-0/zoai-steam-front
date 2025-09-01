import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export function Header() {
  const { logout, accessToken } = useContext(AuthContext)
  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    window.location.href = "/"
  }
  return (
    <div>

      <div className="bg-zinc-900 flex items-center justify-between p-6 text-white ">
        <div className=" px-3 py-2 rounded-lg">
          <a href="/" className="text-2xl font-bold mb-6">
            ZoAI Steam 🎮
          </a>
        </div>
        <div className="flex justify-around gap-10 items-center">
          {accessToken ? (
            <>
              <div>
                <a href="/history" className="px-3 py-2 rounded-lg hover:underline">
                  History
                </a>
              </div>

              <div>
                <button onClick={handleLogout} className="px-3 py-2 rounded-lg hover:underline">
                  Logout
                </button>
              </div>
              <div>
                <a
                  href="https://github.com/1-AkM-0/zoai-steam"
                  className="px-3 py-2 rounded-lg text-indigo-400 hover:underline hover:text-indigo-600"
                  target='_blank'
                  rel='noopener noreferrer'
                >

                  Github
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <a href="/login" className="px-3 py-2 rounded-lg hover:underline">
                  Login
                </a>
              </div>
              <div>
                <a href="/sign-up" className="px-3 py-2 rounded-lg hover:underline">
                  SignUp
                </a>
              </div>

              <div>
                <a
                  href="https://github.com/1-AkM-0/zoai-steam"
                  target="_blank"
                  className="px-3 py-2 rounded-lg text-indigo-400 hover:underline hover:text-indigo-600"
                  rel='noopener noreferrer'
                >

                  Github
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>)
    ;
}

export default Header;
