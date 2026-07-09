import bcrypt from "bcrypt"
import prisma from "../../lib/prisma"
import { signToken } from "../../lib/jwt"
import type { RegisterDTO, LoginDTO, AuthResponse } from "./auth.types"

const SALT_ROUNDS = 12

export async function register(data: RegisterDTO): Promise<AuthResponse> {

    const existingUser = await prisma.user.findFirst({
        where: { email: data.email }
    })

    if (existingUser) {
        throw new Error("Email ja existe. Por favor, use outro email.")
    }

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash,
        }
    })

    const token = signToken({ id: user.id, email: user.email })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}
 
export async function login(data: LoginDTO): Promise<AuthResponse> {

    const user = await prisma.user.findFirst({
        where: { email: data.email }
    })

    if(!user){
        throw new Error("Email ou senha inválidos.")
    }

    const passwordMatch = await bcrypt.compare(data.password, user.passwordHash)

    if(!passwordMatch){
        throw new Error("Senha invalida.")
    }

    const token = signToken({ id: user.id, email: user.email })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}