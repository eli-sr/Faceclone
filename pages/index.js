import { getProviders, getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Header from "./components/Header"
import Login from "./components/Login"
import Sidebar from "./components/Sidebar"
import Feed from "./components/Feed"

export default function Home({ providers }) {
  const { data: session, status } = useSession()
  // if(session)console.log("session",session.id)
  // console.log("status",status)
  // console.log("providers",providers)

  if (session) {
    return (
      <div className="bg-gray-100">
        <Head>
          <title>Faceclone</title>
        </Head>

        <Header/>
        <main className="flex">
          <Sidebar />
          <Feed />
          {/* Widgets */}
        </main>
      </div>
    )
  } else {
    if (status === "loading") return null
    return (
      <div>
        <Head>
          <title>Faceclone Login</title>
        </Head>
        <Login providers={providers} />
      </div>
    )
  }
}

export async function getServerSideProps(context) {
  // const session = await getSession(context)
  const providers = await getProviders()
  return {
    props: {
      // session,
      providers,
    },
  }
}
