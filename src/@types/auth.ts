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
    id?: string | number | null
    userId?: string | null
    avatar?: string | null
    email?: string | null
    authority?: string[]
}

export type Token = {
    access_token: string
}

// Тип для роли пользователя
type UserRole = "PRIVATE_PERSON" | "ADMIN" | "OTHER_ROLE"; // Добавьте другие роли, если необходимо

// Тип для данных пользователя
export interface IUserMe {
    id: number,
    email: string,
    role: UserRole,
};
