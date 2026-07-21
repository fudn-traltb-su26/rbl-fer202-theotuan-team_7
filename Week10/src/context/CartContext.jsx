import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
    };

    const addToCart = (dish) => {
        const existing = cart.find((item) => item.id === dish.id);
        if (existing) {
            setCart(cart.map((item) => 
                item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...dish, quantity: 1 }]);
        }
        triggerToast(`Đã thêm "${dish.name}" vào giỏ hàng!`);
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
        }
    };

    const removeFromCart = (id) => {
        const item = cart.find(i => i.id === id);
        setCart(cart.filter((item) => item.id !== id));
        if (item) {
            triggerToast(`Đã xoá "${item.name}" khỏi giỏ hàng!`);
        }
    };

    const clearCart = () => {
        setCart([]);
        triggerToast("Đã xoá sạch giỏ hàng!");
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Wishlist operations
    const toggleWishlist = (dish) => {
        const exists = wishlist.some((item) => item.id === dish.id);
        if (exists) {
            setWishlist(wishlist.filter((item) => item.id !== dish.id));
            triggerToast(`Đã bỏ thích món "${dish.name}"!`);
        } else {
            setWishlist([...wishlist, dish]);
            triggerToast(`Đã thích món "${dish.name}"!`);
        }
    };

    const isWishlisted = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                addToCart, 
                updateQuantity, 
                removeFromCart, 
                clearCart, 
                totalCartCount,
                wishlist,
                toggleWishlist,
                isWishlisted,
                toastMessage,
                showToast,
                setShowToast
            }}
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
