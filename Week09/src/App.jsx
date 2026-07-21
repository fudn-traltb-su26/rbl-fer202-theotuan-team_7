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
import { CATEGORIES } from './services/mockData';
import { useCart } from './context/CartContext';
import { dishService } from './services/dishService';
import { useFetch } from './hooks/useFetch';

function App() {
  // Fetch dishes list using custom hook
  const { data: dishes, loading, error, refetch: loadDishes } = useFetch(dishService.getDishes);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { totalCartCount } = useCart();

  // Update document title based on cart items count
  useEffect(() => {
    document.title = `TastyHub (${totalCartCount} món)`;
    return () => {
      document.title = 'TastyHub - Nhà hàng trực tuyến';
    };
  }, [totalCartCount]);

  // Admin CRUD operations
  const handleAddDish = async (newDish) => {
    try {
      await dishService.createDish(newDish);
      await loadDishes();
    } catch (err) {
      alert('Không thể thêm món ăn mới.');
    }
  };

  const handleUpdateDish = async (updatedDish) => {
    try {
      await dishService.updateDish(updatedDish.id, updatedDish);
      await loadDishes();
    } catch (err) {
      alert('Không thể cập nhật món ăn.');
    }
  };

  const handleDeleteDish = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá món ăn này không?')) {
      try {
        await dishService.deleteDish(id);
        await loadDishes();
      } catch (err) {
        alert('Không thể xoá món ăn.');
      }
    }
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Filtering logic
  const featuredDishes = dishes.filter((dish) => dish.featured);

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
                  loading={loading}
                  error={error}
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
