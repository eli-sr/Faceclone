import { DotsHorizontalIcon } from "@heroicons/react/solid"

function DropdownPost({ active, openInput,...props }) {
  return (
    <div>
      <div className="relative">
        <button onClick={() => props.setActiveDropdown(!active)}>
          <DotsHorizontalIcon className="h-5 text-gray-500" />
        </button>
        {active && (
          <div className="flex flex-col absolute text-center right-0 bg-gray-200 rounded-lg p-1 text-sm">
            <button
              className="py-1 px-4 rounded-lg hover:bg-gray-300"
              onClick={() => {props.setOpenInput(!openInput);props.setActiveDropdown(!active)}}
            >
              Edit
            </button>
            <button
              className="py-1 px-4 rounded-lg hover:bg-gray-300"
              onClick={() => props.setConfirmDelete(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownPost
