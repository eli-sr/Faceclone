import Image from "next/image";

function LoginDos({ csrfToken }) {
  return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
            <Image
                src="https://links.papareact.com/t4i"
                width={200}
                height={200}
                objectFit="contain"
            />
            <div className="container mx-auto flex flex-col items-center">
                <form method="post" action="/api/auth/callback/credentials"
                className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <input name="username" type="text" placeholder="Username" 
                    className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-2 ring-blue-500" />
                    <input name="password" type="password" placeholder="Password" 
                    className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-2 ring-blue-500" />
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">Login</button>
                    <a className="text-blue-400 text-center my-2">Forgot Pasword?</a>
                    <hr className="mt-2"/>
                    <button className="w-full bg-green-400 mt-6 text-white p-3 rounded-lg font-semibold text-lg">Create New Account</button>
                </form>
            </div>
        </div>
  )
}

export default LoginDos;