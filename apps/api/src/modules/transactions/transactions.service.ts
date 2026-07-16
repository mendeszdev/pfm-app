import prisma from "../../lib/prisma";
import type {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  TransactionFilters,
  TransactionResponse,
} from "./transactions.types";

function formatTransaction(transaction: any): TransactionResponse {
  return {
    id: transaction.id,
    accountId: transaction.accountId,
    categoryId: transaction.categoryId,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    date: transaction.date,
    isManual: transaction.isManual,
    createdAt: transaction.createdAt,
  };
}

export async function createTransaction(
  userId: string,
  data: CreateTransactionDTO,
): Promise<TransactionResponse> {
  const account = await prisma.account.findFirst({
    where: { id: data.accountId, userId },
  });

  if (!account) {
    throw new Error("ACCOUNT_NOT_FOUND");
  }

  const transaction = await prisma.transaction.create({
    data: {
      accountId: data.accountId,
      categoryId: data.categoryId ?? null,
      description: data.description ?? null,
      amount: data.amount,
      type: data.type,
      date: new Date(data.date),
      isManual: true,
    },
  });

  await prisma.account.update({
    where: { id: data.accountId },
    data: {
      balance:
        data.type === "INCOME"
          ? Number(account.balance) + data.amount
          : Number(account.balance) - data.amount,
    },
  });

  return formatTransaction(transaction);
}

export async function getTransactions(
  userId: string,
  filters: TransactionFilters,
): Promise<TransactionResponse[]> {
  const transactions = await prisma.transaction.findMany({
    where: {
      account: { userId },
      ...(filters.accountId && { accountId: filters.accountId }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.type && { type: filters.type }),
      ...(filters.startDate &&
        filters.endDate && {
          date: {
            gte: new Date(filters.startDate),
            lte: new Date(filters.endDate),
          },
        }),
    },
    orderBy: { date: "desc" },
  });

  return transactions.map(formatTransaction);
}

export async function getTransactionById(
  userId: string,
  transactionId: string,
): Promise<TransactionResponse> {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: { userId },
    },
  });

  if (!transaction) {
    throw new Error("TRANSACTION_NOT_FOUND");
  }

  return formatTransaction(transaction);
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  data: UpdateTransactionDTO,
): Promise<TransactionResponse> {
  const existing = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: { userId },
    },
  });

  if (!existing) {
    throw new Error("TRANSACTION_NOT_FOUND");
  }

  const transaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      ...(data.description && { description: data.description }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.type && { type: data.type }),
      ...(data.date && { date: new Date(data.date) }),
    },
  });

  return formatTransaction(transaction);
}

export async function deleteTransaction(
  userId: string,
  transactionId: string,
): Promise<void> {
  const existing = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: { userId },
    },
  });

  if (!existing) {
    throw new Error("TRANSACTION_NOT_FOUND");
  }

  await prisma.transaction.delete({
    where: { id: transactionId },
  });

  await prisma.account.update({
    where: { id: existing.accountId },
    data: {
      balance:
        existing.type === "INCOME"
          ? { decrement: Number(existing.amount) }
          : { increment: Number(existing.amount) },
    },
  });
}
