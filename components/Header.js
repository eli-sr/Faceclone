import Image from "next/image"
import HeaderIcon from "./HeaderIcon"
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import {
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import DropdownSession from "./DropdownSession"
import Link from "next/link"

function Header() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className="fixed w-full top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center mr-2 sm:mr-6">
        <Link href="/">
          <a className="flex items-center">
            <Image hidden src="/fb.webp" width={40} height={40} layout="fixed" />
          </a>
        </Link>
      </div>
      {/* Barra de búsqueda */}
      <div className="flex items-center rounded-full bg-gray-100 p-2.5">
        <SearchIcon className="h-5 text-gray-600 sm:h-6" />
        <input
          type="text"
          placeholder="Search Faceclone"
          className=" hidden lg:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
        />
      </div>
      {/* Center */}
      <div className="flex justify-center flex-grow mx-1 sm:mx-5">
        <div className="flex space-x-2 sm:space-x-9 md:space-x-10">
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
          <HeaderIcon Icon={UserCircleIcon} />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <Link href={`/user/#`}>
          <a className="flex items-center sm:space-x-2">
            <img src={session.user.image} className="h-10 w-10 hidden sm:flex" />
            <p className="hidden md:flex whitespace-nowrap font-semibold mr-3">
              {session.user.name}
            </p>
          </a>
        </Link>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <DropdownSession />
      </div>
    </div>
  )
}

export default Header
