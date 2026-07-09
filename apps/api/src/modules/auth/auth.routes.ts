import type { FastifyInstance } from "fastify";
import { register, login } from "./auth.service";
import type { RegisterDTO, LoginDTO } from "./auth.types";

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterDTO }>("/auth/register", async (request, reply) => {
    try {
      const result = await register(request.body);
      return reply.status(201).send(result);
    } catch (error: any) {
      if (error.message.includes("Email ja cadastrado")) {
        return reply.status(409).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });

  app.post<{ Body: LoginDTO }>("/auth/login", async (request, reply) => {
    try {
      const result = await login(request.body);
      return reply.status(200).send(result);
    } catch (error: any) {
      if (error.message.includes("Email ou senha inválidos")) {
        return reply.status(401).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });
}
