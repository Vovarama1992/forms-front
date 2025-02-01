import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import {
    SignInCredential,
    SignUpCredential,
    SignInResponse,
    SignUpResponse, IUserMe
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.signIn,
        method: 'post',
        data,
    })
}
export async function getUserMe() {
    return ApiService.fetchDataWithAxios<IUserMe>({
        url: endpointConfig.getUserMe,
        method: 'get',
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`},
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.signUp,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}
