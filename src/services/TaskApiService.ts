import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { IResponseStatistic, ITaskCreateRequest, ITaskCreateResponse, ITaskVoteRequest } from '@/@types/task'

export async function apiTaskCreate(data: ITaskCreateRequest): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.create,
        method: 'post',
        data: {
            ...data,
        }
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
