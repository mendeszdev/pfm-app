import prisma from "../../lib/prisma";
import type {
  CreateAlertDTO,
  UpdateAlertDTO,
  AlertResponse,
} from "./alert.types";

function formatAlert(alert: any): AlertResponse {
  return {
    id: alert.id,
    userId: alert.userId,
    type: alert.type,
    channel: alert.channel,
    config: alert.config,
    isActive: alert.isActive,
    createdAt: alert.createdAt,
  };
}

export async function createAlert(
  userId: string,
  data: CreateAlertDTO,
): Promise<AlertResponse> {

  const alert = await prisma.alert.create({
    data: {
      userId,
      type: data.type,
      channel: data.channel,
      config: data.config,
      isActive: data.isActive,
    },
  });

  return formatAlert(alert);
}

export async function getAlerts(userId: string): Promise<AlertResponse[]> {
  const alerts = await prisma.alert.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return alerts.map(formatAlert);
}

export async function getAlertById(
  userId: string,
  alertId: string,
): Promise<AlertResponse> {
  const alert = await prisma.alert.findFirst({
    where: {
      userId,
      id: alertId,
    },
  });

  if (!alert) {
    throw new Error("ALERT_NOT_FOUND");
  }

  return formatAlert(alert);
}

export async function updateAlert(
  userId: string,
  alertId: string,
  data: UpdateAlertDTO,
): Promise<AlertResponse> {
  const existing = await prisma.alert.findFirst({
    where: {
      id: alertId,
      userId: userId,
    },
  });

  if (!existing) {
    throw new Error("ALERT_NOT_FOUND");
  }

  const alert = await prisma.alert.update({
    where: { id: alertId },
    data: {
      ...(data.type && { type: data.type }),
      ...(data.channel && { channel: data.channel }),
      ...(data.config !== undefined && { config: data.config }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  return formatAlert(alert);
}

export async function deleteAlert(
  userId: string,
  alertId: string,
): Promise<void> {
  const existing = await prisma.alert.findFirst({
    where: {
      id: alertId,
      userId: userId,
    },
  });

  if (!existing) {
    throw new Error("ALERT_NOT_FOUND");
  }

  await prisma.alert.delete({
    where: { id: alertId },
  });
}
