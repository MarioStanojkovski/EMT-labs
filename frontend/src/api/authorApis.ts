import axiosInstance from '../axios/axios.ts';

const authorApi = {
    findAll: () => axiosInstance.get('/api/authors'),
    findById: (id: number) => axiosInstance.get(`/api/authors/${id}`),
};

export default authorApi;
