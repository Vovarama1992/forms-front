import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { ITaskCreateRequest, ITaskCreateResponse } from '@/@types/task'

export async function apiTaskCreate(data: ITaskCreateRequest): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.create,
        method: 'post',
        data: {
            ...data,
        }
    })
}

export async function apiTaskImageSave(data: any, id: string, label: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.saveImage}${id}/${label}`,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
    })
}


export async function getTaskByLabel(label: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.getByLabel}/${label}`,
        method: 'get',
    })
}

export async function getTaskImagesByLabel(taskId: string, label: string): Promise<ITaskCreateResponse> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.tasks.getImages}/${taskId}/${label}`,
        method: 'get',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
