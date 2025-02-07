export interface IUserProfile {
    id: number;
    email: string;
    role: string;
    avatarUrl: string | null; // Предположим, что это строка (URL) или null, если аватар отсутствует
    firstName: string | null; // Имя может быть строкой или null
    lastName: string | null;  // Фамилия может быть строкой или null
    phone: string | null;     // Телефон может быть строкой или null
    createdAt: string;
}

export interface IUserBodyProfile {
    firstName: string
    lastName: string
    phone: string
}

export interface IUserPasswordUpdate {
    oldPassword: string
    newPassword: string
}
