/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPreviousAddress } from '@/types/previousaddress';
import axiosInstance from './axios';
import { ApiResponse } from '@/types/auth';

export class ApiClient {
  // Generic requests
  static async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.get(url, config);
    return response.data;
  }

  static async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }

  static async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  }

  static async patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.patch(url, data, config);
    return response.data;
  }

  // Auth specific methods
  static async refreshToken(refreshToken: string) {
    return this.post('/auth/refresh', { refreshToken });
  }

  static async getProfile<ICurrentProfileInfo>() {
    const response = await this.get<ICurrentProfileInfo>('/account');
    return response; 
  }

  static async getCustomerByAppuserId<ICustomerInfo>(appUserId: string) {
    return this.get<ICustomerInfo>(`/customer/info/${appUserId}`);
  }

  static async updateCustomerByAppuserId(appUserId: string, data: any) {
    return this.put(`/customer/info/${appUserId}`, data);
  }

  static async getPreviousAddressesByCustomerId(customerId: number) {
    return this.get<IPreviousAddress[]>(`/previousaddress/customer/${customerId}`);
  }

  static async updateProfile(data: any) {
    return this.put('/auth/profile', data);
  }

  // Claims specific methods
  static async getClaims(params?: any) {
    return this.get('/claims', { params });
  }

  static async getClaimById(id: number | string) {
    return this.get(`/claims/${id}`);
  }

  static async createClaim(data: any) {
    return this.post('/claims', data);
  }

  static async updateClaim(id: number, data: any) {
    return this.put(`/claims/${id}`, data);
  }

  static async deleteClaim(id: string) {
    return this.delete(`/claims/${id}`);
  }

  // User management methods
  static async getUsers(params?: any) {
    return this.get('/users', { params });
  }

  static async getUserById(id: string) {
    return this.get(`/users/${id}`);
  }

  static async createUser(data: any) {
    return this.post('/users', data);
  }

  static async updateUser(id: string, data: any) {
    return this.put(`/users/${id}`, data);
  }

  static async deleteUser(id: string) {
    return this.delete(`/users/${id}`);
  }
}