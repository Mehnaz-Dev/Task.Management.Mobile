export interface TokenUser {
    userId: number;
    employeeEmail?: string;
    employeeName: string;
    images?: string;
    userName?: string;
    company: string;
    role: string;
    roleId?: string;
    status?: string;
}

export const tokenUserDefault: TokenUser = {
    userId: 0,
    employeeEmail: '',
    employeeName: '',
    images: '',
    userName: '',
    company: '',
    role: '',
    roleId: '',
    status: '',
};
