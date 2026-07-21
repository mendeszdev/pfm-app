export type GoalStatus = "active" | "completed" | "cancelled"

export interface CreateGoalDTO {
  name: string
  targetAmount: number
  currentAmount?: number
  deadline?: string
}

export interface UpdateGoalDTO {
  name?: string
  targetAmount?: number
  deadline?: string
  status?: GoalStatus
}

export interface UpdateGoalProgressDTO {
  currentAmount: number
}

export interface GoalResponse {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  progressPercentage: number
  deadline: Date | null
  status: string
  createdAt: Date
  updatedAt: Date
}