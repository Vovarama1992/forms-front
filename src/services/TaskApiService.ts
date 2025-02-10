import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import {
    IResponseStatistic,
    ITaskCreateRequest,
    ITaskCreateResponse,
    ITaskTable, ITaskUpdate,
    ITaskVoteRequest, TaskOption
} from '@/@types/task'

export async function apiTaskCreate(data: ITaskCreateRequest): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.create,
        method: 'post',
        data: {
            ...data,
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiTaskFetch(): Promise<ITaskTable[]> {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.myTasks,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiTasksDelete(ids: number[]): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.tasks,
        method: 'delete',
        data: {
            ids: ids
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiUpdateTask(data: ITaskUpdate, id: number): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.tasks}/${id}`,
        method: 'patch',
        data: {
            ...data,
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiDeleteSingleTaskOption(taskId: number, optionId: number): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.tasks}/${taskId}/options/${optionId}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiAddSingleTaskOption(data: TaskOption, taskId: number): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.tasks}/${taskId}/options`,
        method: 'post',
        data: data,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiDeleteSingleTaskInput(taskId: number, inputId: number): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.tasks}/${taskId}/inputs/${inputId}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}


export async function apiAddSingleTaskInput(data: string, taskId: number): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.tasks}/${taskId}/inputs`,
        method: 'post',
        data: data,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiTaskImageSave(data: FormData, id: string, optionId: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.saveImage}${id}/${optionId}`,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
        data: data,
    })
}


export async function getTaskByLabel(label: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.getByLabel}/${decodeURI(label)}`,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function getTaskById(id: number): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.getById}/${id}`,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function getTaskOptionsImage(taskId: string, optionId: string, optionLabel: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.getImages}/${taskId}/${optionId}`,
        method: 'get',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function fetchTaskVote(
    selectedTaskValues: ITaskVoteRequest,
    taskId: string | undefined,
): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.vote}/${taskId}/vote`,
        method: 'post',
        data: {
            ...selectedTaskValues,
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function fetchTaskStatistics(
    label: string,
): Promise<IResponseStatistic> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.statistics}/${label}`,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}
