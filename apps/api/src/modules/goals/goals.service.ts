import prisma from "../../lib/prisma";
import type {
  CreateGoalDTO,
  UpdateGoalDTO,
  UpdateGoalProgressDTO,
  GoalResponse,
} from "./goals.types";

function formatGoal(goal: any): GoalResponse {
  const current = Number(goal.currentAmount);
  const target = Number(goal.targetAmount);

  return {
    id: goal.id,
    name: goal.name,
    targetAmount: target,
    currentAmount: current,
    progressPercentage: target > 0 ? Math.round((current / target) * 100) : 0,
    deadline: goal.deadline,
    status: goal.status,
    createdAt: goal.createdAt,
    updatedAt: goal.updatedAt,
  };
}

export async function createGoal(
  userId: string,
  data: CreateGoalDTO,
): Promise<GoalResponse> {
  const goal = await prisma.goal.create({
    data: {
      userId,
      name: data.name,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount ?? 0,
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: "active",
    },
  });

  return formatGoal(goal);
}

export async function getGoals(userId: string): Promise<GoalResponse[]> {
  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return goals.map(formatGoal);
}

export async function getGoalById(
  userId: string,
  goalId: string,
): Promise<GoalResponse> {
  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!goal) {
    throw new Error("Meta não encontrada");
  }

  return formatGoal(goal);
}

export async function updateGoal(
  userId: string,
  goalId: string,
  data: UpdateGoalDTO,
): Promise<GoalResponse> {
  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new Error("Meta não encontrada");
  }

  const goal = await prisma.goal.update({
    where: { id: goalId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.targetAmount !== undefined && {
        targetAmount: data.targetAmount,
      }),
      ...(data.deadline !== undefined && {
        deadline: data.deadline ? new Date(data.deadline) : null,
      }),
      ...(data.status && { status: data.status }),
    },
  });

  return formatGoal(goal);
}

export async function updateGoalProgress(
  userId: string,
  goalId: string,
  data: UpdateGoalProgressDTO,
): Promise<GoalResponse> {
  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new Error("Meta não encontrada");
  }

  const isCompleted = data.currentAmount >= Number(existing.targetAmount);

  const goal = await prisma.goal.update({
    where: { id: goalId },
    data: {
      currentAmount: data.currentAmount,
      status: isCompleted ? "completed" : "active",
    },
  });

  return formatGoal(goal);
}

export async function deleteGoal(
  userId: string,
  goalId: string,
): Promise<void> {
  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new Error("Meta não encontrada");
  }

  await prisma.goal.delete({
    where: { id: goalId },
  });
}
