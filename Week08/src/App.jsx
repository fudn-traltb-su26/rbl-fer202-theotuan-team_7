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

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { totalCartCount } = useCart();

  // Load dishes list from Server using Axios
  const loadDishes = async () => {
    try {
      setLoading(true);
      const data = await dishService.getDishes();
      setDishes(data);
      setError('');
    } catch (err) {
      setError('Lỗi kết nối máy chủ json-server, vui lòng kiểm tra port 3001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  // Update document title based on cart items count
  useEffect(() => {
    document.title = `TastyHub (${totalCartCount} món)`;
    return () => {
      document.title = 'TastyHub - Nhà hàng trực tuyến';
    };
  }, [totalCartCount]);

  // Admin CRUD operations with Axios service layer
  const handleAddDish = async (newDish) => {
    try {
      setLoading(true);
      await dishService.createDish(newDish);
      await loadDishes();
    } catch (err) {
      alert('Không thể thêm món ăn mới.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDish = async (updatedDish) => {
    try {
      setLoading(true);
      await dishService.updateDish(updatedDish.id, updatedDish);
      await loadDishes();
    } catch (err) {
      alert('Không thể cập nhật món ăn.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDish = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá món ăn này không?')) {
      try {
        setLoading(true);
        await dishService.deleteDish(id);
        await loadDishes();
      } catch (err) {
        alert('Không thể xoá món ăn.');
      } finally {
        setLoading(false);
      }
    }
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
                loading={loading}
                error={error}
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
