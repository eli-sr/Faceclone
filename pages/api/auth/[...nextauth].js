import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import excuteQuery from "../../../lib/db"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials Provider",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(1){
          var image = "/default.jpg"
          const userProvisional = {
            id: 1,
            name: "provisional",
            email: "example@example.com",
            image: image,
          }
          return userProvisional
        }
        const result = await excuteQuery({
          query: `select * from user where username=?`,
          values: credentials.username
        })
        console.log("result ->", result)
        if (result.length != 0) {
          const target = result[0]
          if (
            credentials.username === target.username &&
            credentials.password === target.password
          ) {
            if(!target.userImage)
              var image = "/default.jpg"
            else
              var image = target.userImage
            const user = {
              id: target.id,
              name: target.name,
              email: target.image,
              image: image,
            }
            return user
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // First time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
})
