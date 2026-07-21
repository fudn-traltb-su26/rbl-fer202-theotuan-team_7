import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const dishService = {
    getDishes: async () => {
        const response = await API.get('/dishes');
        return response.data;
    },
    getDishById: async (id) => {
        const response = await API.get(`/dishes/${id}`);
        return response.data;
    },
    createDish: async (dish) => {
        const response = await API.post('/dishes', dish);
        return response.data;
    },
    updateDish: async (id, dish) => {
        const response = await API.put(`/dishes/${id}`, dish);
        return response.data;
    },
    deleteDish: async (id) => {
        const response = await API.delete(`/dishes/${id}`);
        return response.data;
    }
};
