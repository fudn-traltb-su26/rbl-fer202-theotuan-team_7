import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext';

const defaultTitle = 'TastyHub Restaurant';

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (dish) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === dish.id);

            if (existing) {
                return prevItems.map((item) =>
                    item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...dish, quantity: 1 }];
        });
    };

    const updateQuantity = (dishId, nextQuantity) => {
        if (nextQuantity <= 0) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === dishId ? { ...item, quantity: nextQuantity } : item
            )
        );
    };

    const removeFromCart = (dishId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        document.title = totalItems > 0 ? `(${totalItems}) ${defaultTitle}` : defaultTitle;

        return () => {
            document.title = defaultTitle;
        };
    }, [totalItems]);

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice
    }), [cartItems, totalItems, totalPrice]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
