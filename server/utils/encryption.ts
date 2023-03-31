import jwt, { JwtPayload } from "jsonwebtoken"

const secretKey = process.env.SUPER_SECRET ?? ""
export const encodeString = (str: string) => {
  return jwt.sign(str, secretKey)
}
export const decodeString = (encodedToken: string): JwtPayload => {
  return <JwtPayload>jwt.verify(encodedToken, secretKey)
}
