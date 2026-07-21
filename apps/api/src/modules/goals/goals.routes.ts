import type { FastifyInstance } from "fastify";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  updateGoalProgress,
  deleteGoal,
} from "./goals.service";
import type {
  CreateGoalDTO,
  UpdateGoalDTO,
  UpdateGoalProgressDTO,
} from "./goals.types";

export async function goalRoutes(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: "Token inválido ou ausente" });
    }
  });

  app.post<{ Body: CreateGoalDTO }>("/goals", async (request, reply) => {
    try {
      const userId = (request.user as any).id;
      const goal = await createGoal(userId, request.body);
      return reply.status(201).send(goal);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.get("/goals", async (request, reply) => {
    try {
      const userId = (request.user as any).id;
      const goals = await getGoals(userId);
      return reply.status(200).send(goals);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.get<{ Params: { id: string } }>("/goals/:id", async (request, reply) => {
    try {
      const userId = (request.user as any).id;
      const goal = await getGoalById(userId, request.params.id);
      return reply.status(200).send(goal);
    } catch (error: any) {
      if (error.message === "Meta não encontrada") {
        return reply.status(404).send({ message: "Meta não encontrada" });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.patch<{ Params: { id: string }; Body: UpdateGoalDTO }>(
    "/goals/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const goal = await updateGoal(userId, request.params.id, request.body);
        return reply.status(200).send(goal);
      } catch (error: any) {
        if (error.message === "Meta não encontrada") {
          return reply.status(404).send({ message: "Meta não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.patch<{ Params: { id: string }; Body: UpdateGoalProgressDTO }>(
    "/goals/:id/progress",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        const goal = await updateGoalProgress(
          userId,
          request.params.id,
          request.body,
        );
        return reply.status(200).send(goal);
      } catch (error: any) {
        if (error.message === "Meta não encontrada") {
          return reply.status(404).send({ message: "Meta não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/goals/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as any).id;
        await deleteGoal(userId, request.params.id);
        return reply.status(204).send();
      } catch (error: any) {
        if (error.message === "Meta não encontrada") {
          return reply.status(404).send({ message: "Meta não encontrada" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );
}
