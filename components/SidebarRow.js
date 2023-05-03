import Image from "next/image"

function SidebarRow({src, Icon, title}) {
    return (
        <div className="flex items-center space-x-5 p-3 rounded-xl hover:bg-gray-300 sm:p-4">
            {Icon && 
                <Icon className="h-6 w-6 text-blue-500 sm:h-7 sm:w-7"/>
            }
            <p className="hidden md:inline-flex font-bold">
                {title}
            </p>
        </div>
    )
}

export default SidebarRow
