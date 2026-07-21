import { Alert, Button, Spinner } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import DishDetailPage from './pages/DishDetailPage';
import CartPage from './pages/CartPage';
import DishManagePage from './pages/DishManagePage';
import NotFoundPage from './pages/NotFoundPage';
import { useFetch } from './hooks/useFetch';

function App() {
  const {
    data: dishes,
    loading: dishesLoading,
    error: dishesError,
    refetch: refetchDishes
  } = useFetch('/dishes');
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useFetch('/categories');
  const isAdmin = true;

  const loading = dishesLoading || categoriesLoading;
  const error = dishesError || categoriesError;
  const featuredDishes = dishes.filter((dish) => dish.featured);

  const handleRetry = () => {
    refetchDishes();
    refetchCategories();
  };

  const renderAsyncState = () => {
    if (loading) {
      return (
        <Alert variant="light" className="m-4 text-center border">
          <Spinner animation="border" size="sm" className="me-2" />
          Dang tai du lieu tu json-server...
        </Alert>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="m-4 text-center">
          <p className="mb-3">Khong ket noi duoc json-server: {error}</p>
          <Button variant="outline-danger" onClick={handleRetry}>
            Thu lai
          </Button>
        </Alert>
      );
    }

    return null;
  };

  const asyncState = renderAsyncState();

  return (
    <div>
      <Header />
      <main>
        {asyncState ?? (
          <Routes>
            <Route
              path="/"
              element={<HomePage categories={categories} dishes={featuredDishes} />}
            />
            <Route path="/menu" element={<MenuPage categories={categories} />} />
            <Route path="/books" element={<Navigate to="/menu" replace />} />
            <Route path="/menu/:id" element={<DishDetailPage dishes={dishes} />} />
            <Route path="/books/:id" element={<DishDetailPage dishes={dishes} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/admin/dishes"
              element={
                <ProtectedRoute isAllowed={isAdmin}>
                  <DishManagePage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/books" element={<Navigate to="/admin/dishes" replace />} />
            <Route
              path="/promo"
              element={<HomePage categories={categories} dishes={featuredDishes} />}
            />
            <Route
              path="/contact"
              element={<HomePage categories={categories} dishes={featuredDishes} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
