import excuteQuery from "../../../lib/db"

async function user(req, res) {
  const { id } = req.query
  const result = await excuteQuery({
    query: `select name, userImage from user where id=?`,
    values: id
  })
  return res.status(200).json(result)
}

export default user
