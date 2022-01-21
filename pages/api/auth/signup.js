import excuteQuery from "../../../lib/db"
// const bcrypt = require('bcryptjs'); PENDIENTE

export default async function register(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;
    // validate
    const validate = await excuteQuery({
        query: `select username from user where username='${user.username}'`,
      })
      console.log("result ->", validate)
       if (validate.length != 0)
        return res.status(200).json({ok:false})

    // // hash password //PENDIENTE
    // user.hash = bcrypt.hashSync(password, 10);    

    const create = await excuteQuery({
        query: `insert into user(name,username,password) values(?,?,?)`,
        values: [user.name,user.username,password]
      })
    return res.status(200).json({ok:true});
}
  