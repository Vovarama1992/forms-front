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
    id?: string | number | null; // id может быть строкой, числом или null
    userId?: string | null;      // userId может быть строкой или null
    avatar?: string | null;      // avatar может быть строкой или null
    email?: string | null;       // email может быть строкой или null
    authority?: string[];        // authority может быть массивом строк
    userName: string;            // userName обязательный
    password: string;            // password обязательный
    role: string;                // role обязательный
    createdAt: string;           // createdAt обязательный
    avatarUrl: string | null;    // avatarUrl может быть строк
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
