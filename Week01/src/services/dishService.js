import axios from 'axios';

const API_URL = 'http://localhost:3001';

const FALLBACK_DISHES = [
    {
        id: 1,
        name: 'Phở Bò Tái Lăn',
        chef: 'Đầu bếp Nguyễn',
        price: 65000,
        originalPrice: 75000,
        category: 'Món chính',
        image: 'https://picsum.photos/seed/dish1/300/200'
    },
    {
        id: 2,
        name: 'Bún Chả Hà Nội',
        chef: 'Đầu bếp Trần',
        price: 55000,
        originalPrice: 65000,
        category: 'Món chính',
        image: 'https://picsum.photos/seed/dish2/300/200'
    },
    {
        id: 3,
        name: 'Nem Rán Hà Nội',
        chef: 'Đầu bếp Lê',
        price: 45000,
        originalPrice: 50000,
        category: 'Khai vị',
        image: 'https://picsum.photos/seed/dish3/300/200'
    },
    {
        id: 4,
        name: 'Lẩu Thái Hải Sản',
        chef: 'Đầu bếp Phạm',
        price: 350000,
        originalPrice: 399000,
        category: 'Lẩu & Nướng',
        image: 'https://picsum.photos/seed/dish4/300/200'
    }
];

export const fetchDishes = async () => {
    try {
        const response = await axios.get(`${API_URL}/dishes`);
        return response.data;
    } catch {
        return FALLBACK_DISHES;
    }
};
