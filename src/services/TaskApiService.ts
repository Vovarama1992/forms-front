import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { ITaskCreateRequest } from '@/@types/task'

export async function apiTaskCreate(data: ITaskCreateRequest) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.tasks.create,
        method: 'post',
        data: {
            ...data,
        }
    })
}
