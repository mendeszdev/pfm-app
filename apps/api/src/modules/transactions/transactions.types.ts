export type TransactionType = 'INCOME' | 'EXPENSE';

export interface CreateTransactionDto {
    accountId: string;
    amount: number;
    type: TransactionType;
    categoryId?: string;
    description?: string;
    date: Date;
}

export interface UpdateTransactionDto {
    amount?: number;
    type?: TransactionType;
    categoryId?: string;
    description?: string;
    date?: Date;
}

export interface deleteTransactionDto {
    transactionId: string;
}


export interface TransactionFilters{
    accountId?: string;
    categoryId?: string;
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
}

export interface TransactionResponse{
    id: string;
    accountId: string;
    categoryId?: string | null;
    description?: string | null;
    amount: number;
    type: TransactionType;
    createdAt: Date;
    isManual: boolean;
}