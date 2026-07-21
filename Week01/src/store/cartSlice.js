import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addToCart(state, action) {
            const existing = state.items.find((item) => item.id === action.payload.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity(state, action) {
            const item = state.items.find((cartItem) => cartItem.id === action.payload.id);

            if (!item) return;

            if (action.payload.quantity <= 0) {
                state.items = state.items.filter((cartItem) => cartItem.id !== action.payload.id);
            } else {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
