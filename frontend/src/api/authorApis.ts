import axiosInstance from '../axios/axios.ts';
import type { AuthorFormData } from './types/author.ts';

const authorApi = {
    findAll: () => axiosInstance.get('/api/authors'),
    findById: (id: number) => axiosInstance.get(`/api/authors/${id}`),
    add: (data: AuthorFormData) => axiosInstance.post('/api/authors/add', data),
    edit: (id: string, data: AuthorFormData) => axiosInstance.put(`/api/authors/${id}/edit`, data),
    delete: (id: string) => axiosInstance.delete(`/api/authors/${id}/delete`),
};

export default authorApi;
