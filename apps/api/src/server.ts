import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import { authRoutes } from "./modules/auth/auth.routes";
import { accountRoutes } from "./modules/accounts/account.routes";
import { transactionRoutes } from "./modules/transactions/transactions.routes";
import { alertRoutes } from "./modules/alerts/alert.routes";
const app = Fastify({
  logger: true,
});

async function bootstrap() {
  await app.register(cors, {
    origin: "*",
  })

  await app.register(jwt, {
    secret: process.env.JWT_SECRET!,
  })

  await app.register(authRoutes);
  await app.register(accountRoutes);
  await app.register(transactionRoutes);
  await app.register(alertRoutes)
  app.get("/health", async () => {
    return { status: "ok" };
  })

  try{
    await app.listen({ port: 3333, host: "0.0.0.0" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

bootstrap();