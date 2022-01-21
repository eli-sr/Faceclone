import Image from "next/image"
import Moment from "react-moment"
import DropdownPost from "./DropdownPost"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { db, storage } from "../../firebase"
import { ref, deleteObject } from "firebase/storage"
import InputCard from "./InputCard"

function Post({ id, data }) {
  const { data: session } = useSession()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const deletePost = async () => {
    const imageStorageRef = ref(storage, "posts/" + id + "/image")
    await deleteDoc(doc(db, "posts", id))
    await deleteObject(imageStorageRef)
      .then(() => {
        // console.log("file deleted")
      })
      .catch((error) => {
        // console.log("error :(")
      })
  }
  return (
    <div className="bg-white sm:rounded-xl p-2 sm:p-5 shadow-md">
      <div className="flex justify-between">
        <div className="flex space-x-3 items-center">
          <img src={data.image} className="h-10 w-10" />
          <div className="flex-col">
            <p>{data.name}</p>
            <p className="text-sm text-gray-400">
              <Moment fromNow>{data?.timestamp?.toDate()}</Moment>
            </p>
          </div>
        </div>
        {session.id == data.userId && (
          <DropdownPost
            setConfirmDelete={setConfirmDelete}
            active={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            openInput={editPost}
            setOpenInput={setEditPost}
          />
        )}
      </div>
      <div className="space-y-3">
        <p
          className={`mx-3 mt-0 break-words ${
            data.message.length < 90 ? "text-2xl" : "text-base"
          }`}
        >
          {data.message}
        </p>
        {data.postImage && (
          <div className="w-full flex justify-center">
            <img src={data.postImage} className="rounded-lg min-w-full" />
          </div>
        )}
      </div>
      {confirmDelete && (
        <div className="absolute bg-black/30 w-screen h-screen top-0 left-0 flex flex-col z-50">
          <div className="flex justify-center h-full items-center">
            <div className="bg-gray-50 p-4 rounded-lg w-60 space-y-1">
              <div className="flex p-2">
                <label className="text-center">
                  ¿Seguro de que deseas eliminar el post?
                </label>
              </div>
              <div className="flex justify-evenly space-x-3">
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-blue-400 ring-1"
                  onClick={() => {
                    setConfirmDelete(false)
                    setActiveDropdown(false)
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="bg-red-200 py-2 px-4 rounded-lg text-red-700"
                  onClick={deletePost}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editPost && (
        <InputCard
          type="post"
          session={session}
          input={data.message}
          setOpenInput={setEditPost}
          postId={id}
          postImage={data.postImage}
        />
      )}
    </div>
  )
}

export default Post
