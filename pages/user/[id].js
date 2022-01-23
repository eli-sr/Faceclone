import postData from "../../lib/dataFetch"
import Header from "../components/Header"
import { useSession } from "next-auth/react"
import UserFront from "../components/UserFront"
import { useState } from "react"

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
    console.log(result[0])
    return {
      props: {
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

function profile({ name, image }) {
  const { data: session } = useSession()
  console.log("nam", name)
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
        <UserFront name={name} image={image} />
      </div>
    )
  }
  if (name === null) return <Noexiste />
  return null
}

export default profile
