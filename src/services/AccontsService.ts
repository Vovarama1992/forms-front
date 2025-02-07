import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { IUserBodyProfile, IUserPasswordUpdate, IUserProfile } from '@/@types/account'


export async function getUserProfile(): Promise<IUserProfile> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.users.userProfile}`,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function updateUserProfile(data: IUserBodyProfile): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.users.userProfileUpdate}`,
        method: 'patch',
        data: {
            ...data
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function updateUserAvatar(userId: number, data: FormData): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.users.userAvatarUpdate}/${userId}`,
        method: 'post',
        data: data,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function updateUserPassword(data: IUserPasswordUpdate): Promise<string> {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.users.userPasswordUpdate}`,
        method: 'post',
        data: {
            ...data
        },
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
    })
}

export async function apiGetSettingsProfile<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/setting/profile',
        method: 'get',
    })
}

export async function apiGetSettingsNotification<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/setting/notification',
        method: 'get',
    })
}

export async function apiGetSettingsBilling<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/setting/billing',
        method: 'get',
    })
}

export async function apiGetSettingsIntergration<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/setting/intergration',
        method: 'get',
    })
}
