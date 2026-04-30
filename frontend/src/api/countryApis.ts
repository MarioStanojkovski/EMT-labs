import axiosInstance from '../axios/axios.ts';

const countryApi = {
    findAll: () => axiosInstance.get('/api/countries'),
    findById: (id: number) => axiosInstance.get(`/api/countries/${id}`),
};

export default countryApi;
