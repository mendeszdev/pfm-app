import prisma from "../../lib/prisma";
import type {
    AccountResponse,
  CreateAccountDTO,
  UpdateAccountDTO,
} from "../accounts/accounts.types";

function formatAccount(account: any): AccountResponse {
    return {
        id: account.id,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        balance: Number(account.balance),
        currency: account.currency,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
    };
}

export async function createAccount(userId: string, data: CreateAccountDTO): Promise<AccountResponse> {

    const account = await prisma.account.create({

        data: {
            userId,
            name: data.name,
            type: data.type,
            subtype: data.subtype || null,
            balance: data.balance,
            currency: data.currency || "BRL",
        }
    })
    return formatAccount(account)
}

export async function getAccounts(userId: string, accountId?: string): Promise<AccountResponse[]> {

    const accounts = await prisma.account.findMany({
        where:{ id: accountId, userId }
    })

    if (!accounts) {
        throw new Error("Nenhuma conta encontrada.")
    }

    return accounts.map(formatAccount)
}

export async function getAccountById(userId: string, accountId: string): Promise<AccountResponse> {
  const account = await prisma.account.findFirst({
    where: { id: accountId, userId }
  })

  if (!account) {
    throw new Error("ACCOUNT_NOT_FOUND")
  }

  return formatAccount(account)
}

export async function updateAccount(userId: string, accountId: string, data: UpdateAccountDTO): Promise<AccountResponse> {

    const account = await prisma.account.updateMany({
        where: { id: accountId, userId },
        data: {
            name: data.name || undefined,
            type: data.type || undefined,
            subtype: data.subtype || null,
            balance: data.balance || undefined,
            currency: data.currency || undefined,
        }
    })

    if (!account) {
        throw new Error("Conta não encontrada.")
    }

    const updatedAccount = await prisma.account.update({
        where: { id: accountId, userId },

        data: {
            ...(data.name && { name: data.name }),
            ...(data.type && { type: data.type }),
            ...(data.subtype !== undefined && { subtype: data.subtype }),
            ...(data.balance !== undefined && { balance: data.balance }),
            ...(data.currency && { currency: data.currency }),
        }
    })

    return formatAccount(updatedAccount)
}

export async function deleteAccount(userId: string, accountId: string): Promise<void> {
    const account = await prisma.account.findFirst({
        where: { id: accountId, userId }
    })

    if (!account) {
        throw new Error("Conta não encontrada.")
    }

    await prisma.account.delete({
        where: { id: accountId, userId }
    })

    const deletedAccount = await prisma.account.delete({
        where: { id: accountId, userId }
    })
}