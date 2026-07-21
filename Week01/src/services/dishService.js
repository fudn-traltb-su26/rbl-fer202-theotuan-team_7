import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.message);
        return Promise.reject(error);
    }
);

export const getDishes = async (params = {}) => {
    const response = await api.get('/dishes', { params });
    return response.data;
};

export const getDishById = async (id) => {
    const response = await api.get(`/dishes/${id}`);
    return response.data;
};

export const createDish = async (data) => {
    const response = await api.post('/dishes', data);
    return response.data;
};

export const updateDish = async (id, data) => {
    const response = await api.put(`/dishes/${id}`, data);
    return response.data;
};

export const deleteDish = async (id) => {
    const response = await api.delete(`/dishes/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};
