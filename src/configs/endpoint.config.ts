export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/auth/login',
    signOut: '/sign-out',
    signUp: '/auth/register',
    getUserMe: '/users/me',
    resetPassword: '/reset-password',
    tasks: {
        create: '/tasks',
        vote: '/tasks',
        saveImage: '/images/upload-option-image/',
        getById: '/tasks/by-id',
        getByLabel: '/tasks/by-label',
        getImages: '/images/option-image',
        statistics: '/tasks/statistics',
    }
}

export default endpointConfig
