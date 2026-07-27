import { InputJsonObject } from "@prisma/client/runtime/client"

export interface CreateAlertDTO {
  type: string
  channel: string
  config: InputJsonObject
  isActive: boolean
}

export interface UpdateAlertDTO {
  type?: string
  channel?: string
  config?: InputJsonObject
  isActive?: boolean
}

export interface AlertResponse {
  id: string
  userId: string
  type: string
  channel: string
  config: InputJsonObject
  isActive: boolean
  createdAt: Date
}
