import Link from "next/link"
import { useState } from "react"
import Router from "next/router"
import postData from "../../lib/dataFetch"

function Signup() {
  const [checked, setChecked] = useState(false)
  const [validUser, setValidUser] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Comming soon!")
    return
    // if (name == "" || username == "" || password == "" || confirm == "") return
    // postData("http://localhost:3000/api/auth/signup", {
    //   name: name,
    //   username: username,
    //   password: password,
    // }).then((data) => {
    //   setValidUser(data.ok)
    //   if (!data.ok) {
    //     setUsername("")
    //     setPassword("")
    //     setConfirm("")
    //   } else Router.push("/")
    // })
  }
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white flex flex-col p-8 justify-center sm:max-w-md sm:max-h-[600px] shadow-md rounded-lg"
      >
        <div className="pl-4">
          <h1 className="text-3xl">Sign Up</h1>
          <h3 className="text-gray-500">It's quick and easy</h3>
        </div>
        <div className="flex flex-col pt-10 space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="inputSignup"
            placeholder="Nombre"
            autoFocus
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="inputSignup"
            placeholder="Usuario"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={checked ? "text" : "password"}
            className="inputSignup"
            placeholder="Contraseña"
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type={checked ? "text" : "password"}
            className="inputSignup"
            placeholder="Confirmación"
          />
        </div>
        <div className="flex my-7 space-x-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span>Show password</span>
        </div>
        <div className="w-full flex flex-col items-center space-y-3">
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-lg text-white font-bold text-lg max-w-[200px] min-w-[100px] w-full"
          >
            Sign Up
          </button>
          <Link href="/">
            <a className="text-blue-600">Already have an account?</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
