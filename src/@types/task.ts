export interface ITaskCreateRequest {
    label: string
    description: string
    options: TaskOption[]
    inputs: Input[]
}

export interface ITaskCreateResponse {
    label: string
}

interface TaskOption {
    label: string
    description: string
    taskId: number
}

interface Input {
    label: string
    taskId: number
}
