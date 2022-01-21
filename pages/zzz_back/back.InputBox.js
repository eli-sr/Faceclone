import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import Image from "next/image"
import {
  VideoCameraIcon,
  EmojiHappyIcon,
  CameraIcon,
} from "@heroicons/react/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"

function InputBox() {
  const { data: session } = useSession()
  console.log("session",session)
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    if(loading) return;
    setLoading(true)
    e.preventDefault()
    if (!inputRef.current.value) return

    await addDoc(collection(db, "posts"),{
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    })
    inputRef.current.value = ""
    return
  }
  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-md space-y-4">
      <form className="flex items-center space-x-4">
        <Image src={session.user.image} height={40} width={40} layout="fixed" />
        <input
          className="p-1 px-4 bg-gray-100 rounded-full grow focus:outline-none"
          placeholder={"What's on your mind " + session.user.name + "?"}
          ref={inputRef}
        />
        <button className="hidden" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
      <hr />
      <div className="flex justify-evenly space-x-0">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-400" />
          <p className="text-xs sm:text-sm text-gray-500 font-bold">
            Live Video
          </p>
        </div>
        <div className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm text-gray-500 font-bold">
            Photo/Video
          </p>
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-400" />
          <p className="text-xs sm:text-sm text-gray-500 font-bold">Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
