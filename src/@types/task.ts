export interface ITaskCreateRequest {
    label: string
    description?: string
    options: TaskOption[]
    inputs: Input[] | string[]
    visible: string
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
    visible: 'PUBLIC' | 'PRIVATE'
}

export interface ITaskOptionResponse {
    imageUrl?: string
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

export type TaskType = ITaskCreateResponse


export interface ITaskVoteRequest {
    optionId: number;
    reason: string;
    inputs: {
        [key: string]: string;
    };
    userId?: number;
}

export interface OptionsStatistic {
    optionLabel: string
    votesCount: number
    reasons: string[]
    imageUrl: string
}

export interface TaskDetails {
    label: string
    description: string
    openCount: number
}

export interface IResponseStatistic {
    optionsStatistics: OptionsStatistic[]
    inputsStatistics: {
        inputLabel: string
        answers: string[]
    }[]
    taskDetails: TaskDetails
    totalVotes: number
}
