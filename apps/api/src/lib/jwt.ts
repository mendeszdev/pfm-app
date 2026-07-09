import jwt, { JwtPayload } from "jsonwebtoken"
import type { JWTPayload} from "../modules/auth/auth.types"
    
const secret = process.env.JWT_SECRET!

export function signToken(payload: JWTPayload) {
  return jwt.sign(payload, secret, { expiresIn: "3h" })
}

export function verifyToken(token: string): JWTPayload{
    return jwt.verify(token, secret) as JWTPayload
}