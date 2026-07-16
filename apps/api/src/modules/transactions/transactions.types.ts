export type TransactionType = 'INCOME' | 'EXPENSE';

export interface CreateTransactionDTO {
    accountId: string;
    amount: number;
    type: TransactionType;
    categoryId?: string;
    description: string;
    date: Date;
}

export interface UpdateTransactionDTO {
    amount?: number;
    type?: TransactionType;
    categoryId?: string;
    description?: string;
    date?: Date;
}

export interface deleteTransactionDTO {
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
    date: Date,
    createdAt: Date;
    isManual: boolean;
}