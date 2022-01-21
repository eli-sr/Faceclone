// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function hello(req, res) {
  return(
    <div>
    <form hidden>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" value="John"/>
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" value="Doe"/>
      <input type="submit" value="Submit"></input> 
    </form>
    
    <div className=" w-screen h-screen">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1>Hola</h1>
      </div>
    </div>
    </div>
  )
}
