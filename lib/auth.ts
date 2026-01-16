import { jwtVerify } from "jose"

export async function getSessionUser(token: string | undefined) {
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    return {
      id: payload.userId,
      isAdmin: payload.isAdmin,
      userName: payload.userName,
      email: payload.email,
    }
  } catch (error) {
    console.error("Invalid Token", error)
    return null
  }
}
