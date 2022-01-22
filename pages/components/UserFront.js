import { DotsHorizontalIcon, PencilAltIcon, PlusCircleIcon } from "@heroicons/react/solid"

function UserFront({ name, ...props }) {
  return (
    <div className="bg-white w-full min-h-[350px] max-h-[600px] aspect-[4/3] flex items-end shadow">
      <div className="w-full flex flex-col p-3 space-y-3 items-center">
        <div className="w-full">
          <h1>{name}</h1>
        </div>
        <div className="line"/>
        <div className="flex space-x-2 justify-end">
          <button className="bg-blue-500 py-1.5 px-2 rounded-lg flex items-center space-x-1">
            <PlusCircleIcon className="h-7 text-white"/>
            <span className="font-bold text-white truncate">Crear historia</span>
          </button>
          <button className="bg-gray-200 py-1.5 px-2 rounded-lg flex items-center space-x-1">
            <PencilAltIcon className="h-6" />
            <span className="font-bold truncate">Editar perfil</span>
          </button>
          <button className="bg-gray-200 py-1.5 px-2 rounded-lg flex items-center space-x-1">
            <DotsHorizontalIcon className="h-6"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserFront
