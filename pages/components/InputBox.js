import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import Image from "next/image"
import {
  VideoCameraIcon,
  EmojiHappyIcon,
  CameraIcon,
  XIcon,
} from "@heroicons/react/solid"
import InputCard from "./InputCard"

function Input() {
  const { data: session } = useSession()
  const [input, setInput] = useState("")
  const [openInput, setOpenInput] = useState(false)

  return (
    <div className={"w-full p-5 bg-white rounded-xl shadow-md space-y-4"}>
      <div className="flex items-center space-x-4">
        <Image src={session.user.image} height={50} width={50} layout="fixed" />
        <div
          className="p-2 pl-4 grow bg-gray-100 rounded-full focus:outline-none w-1 cursor hover:bg-gray-200 truncate"
          // onChange={(e) => setInput(e.target.value)}
          onClick={() => setOpenInput(!openInput)}
          placeholder={`What's on your mind ${session.user.name}?`}
          role="button"
        >
          {input ? (
            <p>{input}</p>
          ) : (
            <p className="text-gray-500">
              What's on your mind, {session.user.name}?
            </p>
          )}
        </div>
      </div>
      {openInput && (
        <InputCard
          type="input"
          session={session}
          input={input}
          setInput={setInput}
          setOpenInput={setOpenInput}
        />
      )}
      <hr />
      <div className="flex justify-evenly space-x-0">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-400" />
          <p className="text-xs sm:text-sm text-gray-500 font-bold">
            Live Video
          </p>
        </div>
        <div
          className="inputIcon"
        >
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

export default Input
