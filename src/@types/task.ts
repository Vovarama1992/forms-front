export interface ITaskCreateRequest {
    label: string
    description?: string
    options: TaskOption[]
    inputs: Input[]
}

export interface ITaskCreateResponse {
    id: number
    creatorId: number
    label: string
    description: string
    openCount: number
    createdAt: string
    updatedAt: string
    options: ITaskOptionResponse[]
    inputs: ITaskInputResponse[]
}

export interface ITaskOptionResponse {
    id: number
    taskId: number
    label: string
    description: string
}

export interface ITaskInputResponse {
    id: number
    taskId: number
    label: string
    createdAt: string
}

interface TaskOption {
    label: string
    description: string
    taskId?: number
}

interface Input {
    label: string
    taskId: number
}

