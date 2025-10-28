export interface IUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'editor' | 'cs';
    createdAt?: string;
    updatedAt?: string;
}