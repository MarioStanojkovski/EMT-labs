import axiosInstance from '../axios/axios.ts';
import type { UpdateBookDto } from './types/book.ts';

const bookApi = {
    findAll: () => axiosInstance.get('/api/books'),
    findById: (id: number) => axiosInstance.get(`/api/books/${id}`),
    update: (id: number, data: UpdateBookDto) => axiosInstance.put(`/api/books/${id}/edit`, data),
};

export default bookApi;
