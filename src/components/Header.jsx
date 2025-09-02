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

      <div className="bg-zinc-900 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 text-white ">
        <div className=" mb-4 sm:mb-0">
          <a href="/" className="text-2xl font-bold">
            ZoAI Steam 🎮
          </a>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 items-center">
          {accessToken ? (
            <>
              <div>
                <a href="/history" className="px-3 py-2  hover:underline text-sm sm:text-base">
                  History
                </a>
              </div>

              <div>
                <button onClick={handleLogout} className="px-3 py-2  hover:underline text-sm sm:text-base">
                  Logout
                </button>
              </div>
              <div>
                <a
                  href="https://github.com/1-AkM-0/zoai-steam"
                  className="px-3 py-2 text-indigo-400 hover:underline hover:text-indigo-600 text-sm sm:text-base"
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
