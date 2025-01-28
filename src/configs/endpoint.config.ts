export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/auth/login',
    signOut: '/sign-out',
    signUp: '/auth/register',
    resetPassword: '/reset-password',
    tasks: {
        create: '/tasks',
        saveImage: '/images/upload-option-image/',
        getById: '/tasks/by-id',
        getByLabel: '/tasks/by-label',
        getImages: '/images/option-image',
    }
}

export default endpointConfig
