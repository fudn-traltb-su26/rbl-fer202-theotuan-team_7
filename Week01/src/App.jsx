import { lazy, Suspense } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { useFetch } from './hooks/useFetch';

const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const DishDetailPage = lazy(() => import('./pages/DishDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const DishManagePage = lazy(() => import('./pages/DishManagePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
          <Suspense
            fallback={
              <Alert variant="light" className="m-4 text-center border">
                <Spinner animation="border" size="sm" className="me-2" />
                Dang tai trang...
              </Alert>
            }
          >
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
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
