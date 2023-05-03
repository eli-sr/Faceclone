import { useState } from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

function Login({ providers }) {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [ok, setOk] = useState(true)
  const logIn = async (event) => {
    event.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      username: user,
      password: pass,
    })
    if (res.ok === false) {
      setOk(res.ok)
      setUser("")
      setPass("")
    }
  }
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="my-4">
        <Image src="/fb.webp" width={150} height={150} />
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form
          onSubmit={logIn}
          className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg"
        >
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-2 ring-blue-500"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-2 ring-blue-500"
          />
          {!ok && (
            <div className="mb-3 py-2 px-4 bg-red-100 border border-red-400 rounded-md">
              <h1 className="text-red-600 text-sm text-center">
                Usuario o contraseña incorrectos
              </h1>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg"
          >
            Login
          </button>
          <a className="text-blue-400 text-center my-2">Forgot Pasword?</a>
          <hr className="mt-2" />
          <Link href="/signup">
            <a className="w-full bg-green-500 mt-6 text-white p-3 rounded-lg font-semibold text-lg text-center">
              Create New Account
            </a>
          </Link>
        </form>
      </div>
      <div className="my-3 py-2 px-4 bg-yellow-50 border border-yellow-500 rounded-md">
        <h1 className="text-yellow-600 text-sm text-center">
          Note: Provisionally, any user and password can be used
        </h1>
      </div>
    </div>
  )
}

export default Login
