import InputBox from "./InputBox"
import Posts from "./Posts"

function Feed() {
  return (
    <div className="h-full flex-grow pb-44 pt-20 sm:pt-24 overflow-y-auto">
      <div className="w-full sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-4">
        <InputBox />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
