function HeaderIcon({ Icon }) {
  return (
    <div
      className="
                group  //Necesariooo
                flex 
                items-center 
                cursor-pointer 
                px-1
                sm:h-14 
                lg:px-5
                xl:px-7
                2xl:px-10
                lg:hover:bg-gray-100 
                rounded-xl
                lg:active:border-b-2 
                lg:active:border-blue-500
            "
    >
      <Icon
        className="
                hidden
                sm:flex
                h-5 
                text-center
                sm:h-7
                mx-auto
                text-gray-500
                group-hover:text-blue-500
            "
      />
    </div>
  )
}

export default HeaderIcon
