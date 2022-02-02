import postData from "../../lib/dataFetch"
import Header from "../components/Header"
import { useSession } from "next-auth/react"
import UserFront from "../components/UserProfile/UserFront"
import Posts from "../components/Posts"
import MiniPhotos from "../components/UserProfile/MiniPhotos"

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
  if (result.length != 0) {
    return {
      props: {
        id: params.id,
        name: result[0].name,
        image: result[0].userImage,
      },
    }
  }
  return {
    props: {
      name: null,
    },
  }
}

function profile({ id, name, image }) {
  const { data: session } = useSession()
  console.log("nam", name)
  function Noexiste() {
    return <h1>No existe el usuario</h1>
  }

  if (name) {
    return (
      <div className="w-screen h-screen bg-gray-100 space-y-4 overflow-auto">
        {session && (
          <div>
            <Header />
          </div>
        )}
        <UserFront name={name} image={image} />
        <div className="flex p-5 space-x-4">
          <MiniPhotos id={id}/>
          <div className="w-full h-full">
            <Posts id={id} />
          </div>
        </div>
      </div>
    )
  }
  if (name === null) return <Noexiste />
  return null
}

export default profile
