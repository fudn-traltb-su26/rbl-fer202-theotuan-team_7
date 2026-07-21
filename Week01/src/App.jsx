import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { getCategories, getDishes } from './services/dishService';

function App() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = true;

  const loadData = useCallback(async () => {
    try {
      const [dishData, categoryData] = await Promise.all([
        getDishes(),
        getCategories()
      ]);
      setDishes(dishData);
      setCategories(categoryData);
      setError('');
    } catch (err) {
      setError('Khong ket noi duoc json-server. Hay chay npm run server roi thu lai.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(loadData, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const filteredDishes = useMemo(() => dishes.filter((dish) => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const matchesKeyword =
      normalizedKeyword === '' ||
      dish.name.toLowerCase().includes(normalizedKeyword) ||
      dish.chef.toLowerCase().includes(normalizedKeyword);
    const matchesCategory = activeCategory === null || dish.categoryId === activeCategory;

    return matchesKeyword && matchesCategory;
  }), [activeCategory, dishes, keyword]);

  const featuredDishes = filteredDishes.filter((dish) => dish.featured);

  const handleSearch = (nextKeyword) => {
    setKeyword(nextKeyword);
  };

  const handleSelectCategory = (categoryId) => {
    setActiveCategory((currentCategory) =>
      currentCategory === categoryId ? null : categoryId
    );
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
          <p className="mb-3">{error}</p>
          <Button
            variant="outline-danger"
            onClick={() => {
              setLoading(true);
              loadData();
            }}
          >
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
              element={
                <HomePage
                  categories={categories}
                  dishes={featuredDishes}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <MenuPage
                  categories={categories}
                  dishes={filteredDishes}
                  activeCategory={activeCategory}
                  onSearch={handleSearch}
                  onSelectCategory={handleSelectCategory}
                />
              }
            />
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
              element={
                <HomePage
                  categories={categories}
                  dishes={featuredDishes}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <HomePage
                  categories={categories}
                  dishes={featuredDishes}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />
              }
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
