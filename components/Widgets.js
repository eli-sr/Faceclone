import { PlusIcon } from "@heroicons/react/solid"

function Widgets(){
  return(
    <div className="w-[280px] pt-24 pl-7 hidden lg:flex lg:flex-col mr-3 space-y-1.5">
      <span className="text-lg font-bold text-gray-600">Group discussions</span>
      <div role="button" className="py-3 px-2 flex items-center space-x-3 hover:bg-gray-200 rounded-lg">
        <PlusIcon className="p-2 bg-gray-300 text-gray-800 rounded-full h-8"/>
        <span>Create new group</span>
      </div>
    </div>
  )
}
export default Widgets