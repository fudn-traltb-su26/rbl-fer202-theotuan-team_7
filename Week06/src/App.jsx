import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import DishManagePage from './pages/DishManagePage';
import DishDetailPage from './pages/DishDetailPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { INITIAL_DISHES, CATEGORIES } from './services/mockData';

function App() {
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [cart, setCart] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cart operations
  const handleAddToCart = (dish) => {
    const existing = cart.find((item) => item.id === dish.id);
    if (existing) {
      setCart(cart.map((item) => 
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Admin CRUD operations
  const handleAddDish = (newDish) => {
    setDishes([...dishes, newDish]);
  };

  const handleUpdateDish = (updatedDish) => {
    setDishes(dishes.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish)));
  };

  const handleDeleteDish = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Filtering logic
  const featuredDishes = dishes.filter((dish) => dish.featured);

  const filteredDishes = dishes.filter((dish) => {
    const matchesKeyword = !searchKeyword || 
      dish.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
      dish.chef.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesCategory = activeCategory === null || dish.category === activeCategory;
    return matchesKeyword && matchesCategory;
  });

  return (
    <div>
      <Header cartCount={totalCartCount} isLoggedIn={isLoggedIn} onToggleLogin={toggleLogin} />
      <main style={{ minHeight: 'calc(100vh - 180px)' }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                categories={CATEGORIES}
                dishes={featuredDishes}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                categories={CATEGORIES}
                dishes={filteredDishes}
                onAddToCart={handleAddToCart}
                onSearch={setSearchKeyword}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            }
          />
          <Route
            path="/dish/:id"
            element={<DishDetailPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DishManagePage
                  dishes={dishes}
                  onAddDish={handleAddDish}
                  onUpdateDish={handleUpdateDish}
                  onDeleteDish={handleDeleteDish}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
