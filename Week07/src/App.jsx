import { useState, useEffect } from 'react';
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
import { useCart } from './context/CartContext';

function App() {
  const [dishes, setDishes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { totalCartCount } = useCart();

  // Simulate loading data with useEffect on mount
  useEffect(() => {
    setDishes(INITIAL_DISHES);
  }, []);

  // Update document title based on cart items count
  useEffect(() => {
    document.title = `TastyHub (${totalCartCount} món)`;
    return () => {
      document.title = 'TastyHub - Nhà hàng trực tuyến';
    };
  }, [totalCartCount]);

  // Admin CRUD operations (synchronous local update)
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
      <Header isLoggedIn={isLoggedIn} onToggleLogin={toggleLogin} />
      <main style={{ minHeight: 'calc(100vh - 180px)' }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                categories={CATEGORIES}
                dishes={featuredDishes}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                categories={CATEGORIES}
                dishes={filteredDishes}
                onSearch={setSearchKeyword}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            }
          />
          <Route
            path="/dish/:id"
            element={<DishDetailPage />}
          />
          <Route
            path="/cart"
            element={
              <CartPage />
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
