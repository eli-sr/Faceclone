import InputBox from "./InputBox"
import Posts from "./Posts"

function Feed() {
  return (
    <div className="h-screen flex-grow pb-44 pt-24 mr-2 overflow-y-auto sm:mx-5">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-6">
        {/* Stories */}
        <InputBox />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
