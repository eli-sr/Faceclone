import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"

function DropdownSession() {
  const [active, setActive] = useState(false)
  const {data: session} = useSession()
  return (
    <menu className="relative inline-block text-right">
      <button onClick={()=>{setActive(!active)}} className="flex items-center">
        <ChevronDownIcon className="icon flex"/>
      </button>
      {active &&
        <div className="flex flex-col absolute right-0 rounded-lg shadow-lg bg-gray-100 p-2 w-28 text-center text-gray-700 text-sm xl:w-36 xl:text-lg">
          <Link href={`/user/${session.id}`}>
            <a className="py-2 px-4 rounded-lg hover:bg-gray-200" href="#">My profile</a>
          </Link>
          <a className="py-2 px-4 rounded-lg hover:bg-gray-200" href="#">Settings</a>
          <button className="py-2 px-4 rounded-lg hover:bg-gray-200" onClick={(e)=>{signOut()}}>Log out</button>
        </div>
      }
    </menu>
  )
}

export default DropdownSession
