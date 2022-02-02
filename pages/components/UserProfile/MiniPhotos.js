import { query, where, collection, limit, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../firebase"

function MiniPhotos({ id }) {
  const [posts, setPosts] = useState({})
  useEffect(async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", parseInt(id), limit(6))
    )
    const querySnapshot = await getDocs(q)
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data())
    // })
    setPosts(querySnapshot)
  })
  return (
    <div className="w-[500px] bg-white rounded-lg shadow p-4">
      <h1 className="text-xl font-bold">Fotos</h1>
    </div>
  )
}

export default MiniPhotos
