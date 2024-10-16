import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your API base URL and timeout
const apiBaseUrl = 'https://crmmobileapi.equitec.in/api/';
const HTTP_REQUEST_TIMEOUT = 5000; // 5 seconds timeout

// Define constants for storage keys and authentication scheme
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const AUTHENTICATION_SCHEME = 'Bearer';

// Helper function to get the token from storage
const getAccessToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

// Create Axios client configuration
const getClient = async () => {
  const accessToken = await getAccessToken();
  const headers = {
    Authorization: `${AUTHENTICATION_SCHEME} ${accessToken || ''}`,
    'Content-Type': 'application/json',
  };

  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: HTTP_REQUEST_TIMEOUT,
    headers,
  });

  return axiosInstance;
};

class RequestService {
  public async getAsync<T>(url: string): Promise<T | undefined> {
    return this.requestAsync<T>(url, 'GET');
  }

  public async postAsync<T>(url: string, requestObject: any): Promise<T | undefined> {
    return this.requestAsync<T>(url, 'POST', requestObject);
  }

  // Generic method for PUT request
  public async putAsync<T>(url: string, requestObject: any): Promise<T | undefined> {
    return this.requestAsync<T>(url, 'PUT', requestObject);
  }

  // Generic method for DELETE request
  public async deleteAsync<T>(url: string): Promise<T | undefined> {
    return this.requestAsync<T>(url, 'DELETE');
  }

  // Generic request handler for different HTTP methods
  private async requestAsync<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T | undefined> {
    try {
      const client = await getClient();
      const config: AxiosRequestConfig = { method, url, data };

      const response: AxiosResponse<T> = await client(config);
      
      return response.data;
    } catch (error: any) {
      // Handle different error types
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';
        this.handleHttpError(status, message);
      } else if (error.request) {
        console.error('No response from the server', error.request);
      } else {
        console.error('Error in setting up request', error.message);
      }
      return undefined;
    }
  }

  // Handle different HTTP error statuses
  private handleHttpError(status: number, message: string) {
    switch (status) {
      case 400:
        console.error('Bad Request:', message);
        break;
      case 403:
        console.error('Forbidden:', message);
        break;
      case 401:
        console.error('Unauthorized:', message);
        break;
      case 500:
        console.error('Internal Server Error:', message);
        break;
      case 503:
        console.error('Service Unavailable:', message);
        break;
      default:
        console.error(`Error: ${status} - ${message}`);
        break;
    }
  }
}

export default new RequestService(); 
