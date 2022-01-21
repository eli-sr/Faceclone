import { collection, query, onSnapshot ,orderBy} from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"
import Post from "./Post"

function Posts() {
  const [posts, setPosts] = useState([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  )
  return (
    <div className="flex-col space-y-4">
      {
        posts.join() == "" &&
        <div className="space-y-4">
          <p className="bg-gray-200 rounded-lg p-24"></p>
          <p className="bg-gray-200 rounded-lg p-24"></p>
          <p className="bg-gray-200 rounded-lg p-24"></p>
          <p className="bg-gray-200 rounded-lg p-24"></p>
        </div>
      }
      {
        posts.map(post=>(
          <Post key={post.id} id={post.id} data={post.data()}/>
        ))
      }
    </div>
  )
}

export default Posts
