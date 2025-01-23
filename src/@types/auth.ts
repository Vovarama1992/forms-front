export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    access_token: string
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    email: string
    password: string
    role: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    email?: string | null
    authority?: string[]
}

export type Token = {
    access_token: string
}
