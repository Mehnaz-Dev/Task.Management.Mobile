import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ClaimTypes } from '../models/ClaimTypes';

export interface TokenUser {
    UserId: string;
    EmployeeNo: string;
    Name: string;
    Company: string;
    CompanyCode: string;
    Role: string;
    LastLogin: string;
    SchemeCode: string;
    ExpiryTime: string;
    RetirementDate: string;
    IsHR: boolean;
    IsIncharge: boolean;
}

class LocalStorageService {

    async saveUserAsync(jwtToken: string): Promise<void> {
        await AsyncStorage.setItem('ACCESS_TOKEN', jwtToken);
    }

    async getUserAsync(): Promise<TokenUser | null> {
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        if (!token) return null;

        const decoded: any = jwtDecode(token);

        return {
            UserId: decoded[ClaimTypes.UserId],
            EmployeeNo: decoded[ClaimTypes.EmployeeNo],
            Name: decoded[ClaimTypes.Name],
            Company: decoded[ClaimTypes.Company],
            CompanyCode: decoded[ClaimTypes.CompanyCode],
            Role: decoded[ClaimTypes.Role],
            LastLogin: decoded[ClaimTypes.LastLogin],
            SchemeCode: decoded[ClaimTypes.SchemeCode],
            ExpiryTime: decoded[ClaimTypes.ExpiryTime],
            RetirementDate: decoded[ClaimTypes.RetirementDate],
            IsHR: decoded[ClaimTypes.IsHR] === 'true',
            IsIncharge: decoded[ClaimTypes.IsIncharge] === 'true',
        };
    }

    async clear(): Promise<void> {
        await AsyncStorage.clear();
    }
}
export default new LocalStorageService(); 