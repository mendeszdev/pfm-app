export interface CreateAccountDTO {
  name: string
  type: string
  subtype?: string
  balance: number
  currency?: string
}

export interface UpdateAccountDTO {
  name?: string
  type?: string
  subtype?: string
  balance?: number
  currency?: string
}

export interface AccountResponse {
  id: string
  name: string
  type: string
  subtype: string | null
  balance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}