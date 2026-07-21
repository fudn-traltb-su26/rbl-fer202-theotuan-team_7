import React, { Suspense, useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toast, ToastContainer, Spinner, Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { CATEGORIES } from './services/mockData';
import { useCart } from './context/CartContext';
import { dishService } from './services/dishService';
import { useFetch } from './hooks/useFetch';

// Lazy loading components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const MenuPage = React.lazy(() => import('./pages/MenuPage'));
const DishManagePage = React.lazy(() => import('./pages/DishManagePage'));
const DishDetailPage = React.lazy(() => import('./pages/DishDetailPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <Container className="text-center py-5" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animation="border" variant="danger" style={{ width: '3rem', height: '3rem' }} />
    <p className="mt-3 text-muted">Đang tải trang...</p>
  </Container>
);

function App() {
  const { data: dishes, loading, error, refetch: loadDishes } = useFetch(dishService.getDishes);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { totalCartCount, showToast, toastMessage, setShowToast } = useCart();

  // Update title
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

  const featuredDishes = dishes.filter((dish) => dish.featured);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onToggleLogin={toggleLogin} />
      
      <main style={{ minHeight: 'calc(100vh - 180px)' }}>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>

      {/* Global Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999, position: 'fixed' }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={2500} 
          autohide 
          className="border-0 shadow"
          bg="dark"
        >
          <Toast.Body className="text-white d-flex align-items-center justify-content-between">
            <span>📢 {toastMessage}</span>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowToast(false)}
            ></button>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </div>
  );
}

export default App;
