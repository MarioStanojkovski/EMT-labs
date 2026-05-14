import axiosInstance from '../axios/axios.ts';
import type { BookFormData } from './types/book.ts';

const bookApi = {
    findAll: () => axiosInstance.get('/api/books'),
    getStates: () => axiosInstance.get<string[]>('/api/books/states'),
    filter: (state?: string) => axiosInstance.get('/api/books/filter', { params: { state, size: 100 } }),
    findById: (id: number) => axiosInstance.get(`/api/books/${id}`),
    add: (data: BookFormData) => axiosInstance.post('/api/books/add', data),
    edit: (id: string, data: BookFormData) => axiosInstance.put(`/api/books/${id}/edit`, data),
    delete: (id: string) => axiosInstance.delete(`/api/books/${id}/delete`),
};

export default bookApi;
