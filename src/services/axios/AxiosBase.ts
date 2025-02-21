import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError } from 'axios'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import { useSessionUser } from '@/store/authStore'

const AxiosBase = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    },
})

AxiosBase.interceptors.request.use(
    (config) => {
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response || {}

        if (status === 401 || status === 403 || status === 404) {
            localStorage.removeItem(TOKEN_NAME_IN_STORAGE)

            const { setSessionSignedIn } = useSessionUser.getState()
            setSessionSignedIn(false)
        }

        return Promise.reject(error)
    },
)

export default AxiosBase
