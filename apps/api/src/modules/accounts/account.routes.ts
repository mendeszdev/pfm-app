import type { FastifyInstance } from "fastify";
import {
  getAccounts,
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "./account.service";
import type {
  CreateAccountDTO,
  UpdateAccountDTO,
} from "../accounts/accounts.types";

export async function accountRoutes(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: "Não autorizado." });
    }
  });

  app.get("/accounts", async (request, reply) => {
    try {
      const userId = (request.user as { id: string }).id;
      const accounts = await getAccounts(userId);
      return reply.status(200).send(accounts);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });


  app.post<{ Body: CreateAccountDTO }>("/accounts", async (request, reply) => {
    try{
        const userId = (request.user as { id: string }).id;
        const account = await createAccount(userId, request.body);
        return reply.status(201).send(account);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });
  
   app.get<{ Params: { id: string } }>("/accounts/:id", async (request, reply) => {
    try {
      const userId = (request.user as { id: string }).id;
      const account = await getAccountById(userId, request.params.id);
      return reply.status(200).send(account);
    } catch (error: any) {
        if (error.message.includes("Conta não encontrada")) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });

  app.patch<{ Params: { id: string }; Body: UpdateAccountDTO }>("/accounts/:id", async (request, reply) => {
    try{
        const userId = (request.user as { id: string }).id;
        const account = await updateAccount(userId, request.params.id, request.body);
        return reply.status(200).send(account);
    } catch (error: any) {
        if (error.message.includes("Conta não encontrada")) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });

  app.delete<{ Params: { id: string } }>("/accounts/:id", async (request, reply) => {
    try{
        const userId = (request.user as { id: string }).id;
        await deleteAccount(userId, request.params.id);
        return reply.status(204).send();
    } catch (error: any) {
        if (error.message.includes("Conta não encontrada")) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(500).send({ message: "Erro interno do servidor." });
    }
  });
}
