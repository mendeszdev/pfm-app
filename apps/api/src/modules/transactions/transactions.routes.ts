import type { FastifyInstance } from "fastify";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./transactions.service";
import type {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  TransactionFilters,
} from "./transactions.types";

export async function transactionRoutes(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: "Não autorizado" });
    }
  });

  app.post<{ Body: CreateTransactionDTO }>(
    "/transactions",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const transaction = await createTransaction(userId, request.body);
        return reply.status(201).send(transaction);
      } catch (error: any) {
        if (error.message === "Conta não encontrada") {
          return reply.status(404).send({ message: "Conta não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.get<{ Querystring: TransactionFilters }>(
    "/transactions",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const transactions = await getTransactions(userId, request.query);
        return reply.status(200).send(transactions);
      } catch (error: any) {
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.get<{ Params: { id: string } }>(
    "/transactions/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const transaction = await getTransactionById(userId, request.params.id);
        return reply.status(200).send(transaction);
      } catch (error: any) {
        if (error.message === "Transação não encontrada") {
          return reply
            .status(404)
            .send({ message: "Transação não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.patch<{ Params: { id: string }; Body: UpdateTransactionDTO }>(
    "/transactions/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const transaction = await updateTransaction(
          userId,
          request.params.id,
          request.body,
        );
        return reply.status(200).send(transaction);
      } catch (error: any) {
        if (error.message === "Transação não encontrada") {
          return reply
            .status(404)
            .send({ message: "Transação não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/transactions/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        await deleteTransaction(userId, request.params.id);
        return reply.status(204).send();
      } catch (error: any) {
        if (error.message === "Transação não encontrada") {
          return reply
            .status(404)
            .send({ message: "Transação não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );
}
