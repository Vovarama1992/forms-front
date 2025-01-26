export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/auth/login',
    signOut: '/sign-out',
    signUp: '/auth/register',
    resetPassword: '/reset-password',
    tasks: {
        create: '/tasks',
        getById: '/tasks/by-id/:taskId',
    }
}

export default endpointConfig
