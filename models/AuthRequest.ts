export interface AuthRequest {
    userName: string;
    password: string;
}

export const authRequestDefault: AuthRequest = {
    userName: '',
    password: '',
};
