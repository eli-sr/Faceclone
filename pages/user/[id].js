import postData from "../../lib/dataFetch"
import Header from "../components/Header"
import { useSession } from "next-auth/react"
import UserFront from "../components/UserFront"

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const result = await postData(
    `http://localhost:3000/api/user/${params.id}`,
    {}
  )
  console.log("len->", result.length)
  var name = null
  if (result.length != 0) name = result[0].name
  console.log(name)
  return {
    props: {
      name: name,
    },
  }
}

function profile({ name, ...props }) {
  const { data: session } = useSession()
  function Noexiste() {
    return <h1>No existe el usuario</h1>
  }

  if (name) {
    return (
      <div className="w-screen h-screen bg-gray-100">
        {session && (
          <div>
            <Header />
          </div>
        )}
        <UserFront name={name}/>
      </div>
    )
  }
}

export default profile
