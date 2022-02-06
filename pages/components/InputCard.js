import {
  EmojiHappyIcon,
  PhotographIcon,
  LocationMarkerIcon,
  XIcon,
  UserIcon,
  MicrophoneIcon,
  DotsHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid"
import {
  addDoc,
  setDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { useState, useRef } from "react"
import { db, storage } from "../../firebase"
import { ref, getDownloadURL, uploadString } from "firebase/storage"

function InputCard({ type, session, ...props }) {
  const [text, setText] = useState(props.input)
  const [selectFile, setSelectFile] = useState(props.postImage)
  const [fileSelected, setFileSelected] = useState(
    props.postImage ? props.postImage : null
  )
  const filePickerRef = useRef(null)
  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setFileSelected(readerEvent.target.result)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    props.setOpenInput(false)
    if (props.input == "" && !fileSelected) return
    props.setInput("")
    const docRef = await addDoc(collection(db, "posts"), {
      userId: session.id,
      name: session.user.name,
      image: session.user.image,
      message: props.input,
      timestamp: serverTimestamp(),
    })
    const imageStorageRef = ref(storage, "posts/" + docRef.id + "/image")
    if (fileSelected) {
      await uploadString(imageStorageRef, fileSelected, "data_url").then(
        async () => {
          const imageDownloadURL = await getDownloadURL(imageStorageRef)
          await updateDoc(doc(db, "posts", docRef.id), {
            postImage: imageDownloadURL,
          })
        }
      )
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    props.setOpenInput(false)
    const imageStorageRef = ref(storage, "posts/" + props.postId + "/image")
    if (fileSelected && fileSelected != props.postImage) {
      await uploadString(imageStorageRef, fileSelected, "data_url").then(
        async () => {
          const imageDownloadURL = await getDownloadURL(imageStorageRef)
          await updateDoc(doc(db, "posts", props.postId), {
            message: text,
            timestamp: serverTimestamp(),
            postImage: imageDownloadURL,
          })
        }
      )
    } else {
      await updateDoc(doc(db, "posts", props.postId), {
        message: text,
        timestamp: serverTimestamp(),
        postImage: fileSelected
      })
    }
  }
  return (
    <div className="absolute left-0 top-0 z-10 bg-opacity-70 w-full h-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md p-4 rounded-md min-w-[360px] sm:min-w-[500px] space-y-4">
        <div className="flex items-center w-full relative justify-center">
          <h1 className="text-2xl font-bold">
            {type == "input" ? "Create post" : "Edit post"}
          </h1>
          <button
            className="absolute right-0"
            onClick={() => props.setOpenInput(false)}
          >
            <XIcon className="bg-gray-200 p-1 rounded-full text-gray-500 h-8 hover:bg-gray-300" />
          </button>
        </div>
        <hr />
        <div className="flex space-x-2">
          <img src={session.user.image} className="h-12 w-12 my-1" />
          <div className="flex flex-col space-y-0">
            <span className="font-bold">{session.user.name}</span>
            <span className="text-sm bg-gray-300 rounded-md text-center px-2 font-bold">
              x Amigo x
            </span>
          </div>
        </div>
        <div className="w-full relative">
          <textarea
            className={`w-full h-36 resize-none outline-none placeholder:text-gray-500 ${
              props.input.length > 90 ? "text-md" : "text-2xl"
            } ${
              selectFile
                ? "h-11 placeholder:text-lg text-lg"
                : "h-36 placeholder:text-2xl"
            }`}
            placeholder={`What's on your mind ${session.user.name}?`}
            onChange={(e) => 
              type == "input"
                ? props.setInput(e.target.value)
                : setText(e.target.value)
            }
            autoFocus
            defaultValue={props.input}
          ></textarea>
          <EmojiHappyIcon className="text-gray-200 h-8 absolute right-0 bottom-0" />
        </div>
        {selectFile && (
          <div className="w-full min-h-[250px] flex items-center ring-1 ring-gray-300 rounded-lg p-1 relative">
            <button
              onClick={() => {
                setSelectFile(false)
                setFileSelected(null)
              }}
            >
              <XIcon className="h-7 absolute top-0 right-0 m-2 text-gray-500 p-1 ring-1 ring-gray-300 bg-white rounded-full hover:bg-gray-200" />
            </button>
            {fileSelected ? (
              <img
                src={fileSelected}
                alt=""
                className="rounded-lg max-w-full"
              />
            ) : (
              <div
                role="button"
                onClick={() => filePickerRef.current.click()}
                className="flex flex-col w-full h-[250px] justify-center rounded-lg items-center hover:bg-gray-200"
              >
                <PlusCircleIcon className="h-10 text-gray-400" />
                <span className="text-lg select-none">Add photos/videos</span>
                <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between ring-1 ring-gray-300 py-3 px-4 rounded-lg">
          <span className="font-extrabold">Add to post</span>
          <div className="flex items-center justify-between space-x-2">
            <button onClick={() => setSelectFile(true)}>
              <PhotographIcon
                className={`h-8 text-green-500 box-content p-1 rounded-full ${
                  selectFile && "bg-green-100"
                }`}
              />
            </button>
            <UserIcon className="h-8 text-blue-500" />
            <EmojiHappyIcon className="h-8 text-yellow-400" />
            <LocationMarkerIcon className="h-8 text-red-500" />
            <MicrophoneIcon className="h-7 text-pink-600" />
            <DotsHorizontalIcon className="h-5 text-gray-500" />
          </div>
        </div>
        <button
          onClick={type == "input" ? handleSubmit : handleUpdate}
          className="w-full bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-400"
          disabled={(type=="input"? !props.input : !text) && !fileSelected}
        >
          Publicar
        </button>
      </div>
    </div>
  )
}

export default InputCard
