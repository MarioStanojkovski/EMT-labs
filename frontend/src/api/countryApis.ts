import axiosInstance from '../axios/axios.ts';
import type { CountryFormData } from './types/country.ts';

const countryApi = {
    findAll: () => axiosInstance.get('/api/countries'),
    findById: (id: number) => axiosInstance.get(`/api/countries/${id}`),
    add: (data: CountryFormData) => axiosInstance.post('/api/countries/add', data),
    edit: (id: string, data: CountryFormData) => axiosInstance.put(`/api/countries/${id}/edit`, data),
    delete: (id: string) => axiosInstance.delete(`/api/countries/${id}/delete`),
};

export default countryApi;
