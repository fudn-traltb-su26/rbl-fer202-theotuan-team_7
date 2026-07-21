import {
    createDish,
    deleteDish,
    getDishById,
    getDishes,
    updateDish
} from './dishService';

export const getBooks = getDishes;
export const getBookById = getDishById;
export const createBook = createDish;
export const updateBook = updateDish;
export const deleteBook = deleteDish;
