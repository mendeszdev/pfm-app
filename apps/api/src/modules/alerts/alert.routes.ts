import type { FastifyInstance } from "fastify";
import {
  createAlert,
  getAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
} from "./alert.service";
import type { CreateAlertDTO, UpdateAlertDTO } from "./alert.types";

export async function alertRoutes(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: "Não autorizado" });
    }
  });

  app.post<{ Body: CreateAlertDTO }>("/alerts", async (request, reply) => {
    try {
      const userId = (request.user as { id: string }).id;
      const alert = await createAlert(userId, request.body);
      return reply.status(201).send(alert);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.get("/alerts", async (request, reply) => {
    try {
      const userId = (request.user as { id: string }).id;
      const alerts = await getAlerts(userId);
      return reply.status(200).send(alerts);
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.get<{ Params: { id: string } }>(
    "/alerts/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as { id: string }).id;
        const alert = await getAlertById(userId, request.params.id);
        return reply.status(200).send(alert);
      } catch (error: any) {
        if (error.message === "ALERT_NOT_FOUND") {
          return reply.status(404).send({ message: "Alerta não encontrado" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.patch<{ Params: { id: string }; Body: UpdateAlertDTO }>(
    "/alerts/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as { id: string }).id;
        const alert = await updateAlert(
          userId,
          request.params.id,
          request.body,
        );
        return reply.status(200).send(alert);
      } catch (error: any) {
        if (error.message === "ALERT_NOT_FOUND") {
          return reply.status(404).send({ message: "Alerta não encontrado" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/alerts/:id",
    async (request, reply) => {
      try {
        const userId = (request.user as { id: string }).id;
        await deleteAlert(userId, request.params.id);
        return reply.status(204).send();
      } catch (error: any) {
        if (error.message === "ALERT_NOT_FOUND") {
          return reply.status(404).send({ message: "Alerta não encontrado" });
        }
        return reply.status(500).send({ message: "Erro interno do servidor" });
      }
    },
  );
}
