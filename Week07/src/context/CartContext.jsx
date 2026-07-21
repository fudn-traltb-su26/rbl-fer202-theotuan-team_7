import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (dish) => {
        const existing = cart.find((item) => item.id === dish.id);
        if (existing) {
            setCart(cart.map((item) => 
                item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...dish, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider 
            value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalCartCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
