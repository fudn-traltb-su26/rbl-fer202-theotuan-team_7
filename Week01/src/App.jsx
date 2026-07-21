import { useState } from 'react';
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

const DISHES = [
  {
    id: 1,
    name: 'Pho Bo Tai Lan',
    chef: 'Dau bep Nguyen',
    price: 65000,
    originalPrice: 75000,
    category: 'Mon chinh',
    categoryId: 2,
    image: 'https://picsum.photos/seed/dish1/300/200',
    rating: 4.8,
    reviewCount: 142,
    stock: 50,
    featured: true
  },
  {
    id: 2,
    name: 'Bun Cha Ha Noi',
    chef: 'Dau bep Tran',
    price: 55000,
    originalPrice: 65000,
    category: 'Mon chinh',
    categoryId: 2,
    image: 'https://picsum.photos/seed/dish2/300/200',
    rating: 4.7,
    reviewCount: 210,
    stock: 40,
    featured: true
  },
  {
    id: 3,
    name: 'Nem Ran Ha Noi',
    chef: 'Dau bep Le',
    price: 45000,
    originalPrice: 50000,
    category: 'Khai vi',
    categoryId: 1,
    image: 'https://picsum.photos/seed/dish3/300/200',
    rating: 4.6,
    reviewCount: 85,
    stock: 100,
    featured: false
  },
  {
    id: 4,
    name: 'Lau Thai Hai San',
    chef: 'Dau bep Pham',
    price: 350000,
    originalPrice: 399000,
    category: 'Lau & Nuong',
    categoryId: 3,
    image: 'https://picsum.photos/seed/dish4/300/200',
    rating: 4.9,
    reviewCount: 64,
    stock: 15,
    featured: true
  },
  {
    id: 5,
    name: 'Tra Dao Cam Sa',
    chef: 'Barista Hoang',
    price: 32000,
    originalPrice: 39000,
    category: 'Do uong',
    categoryId: 5,
    image: 'https://picsum.photos/seed/dish5/300/200',
    rating: 4.5,
    reviewCount: 74,
    stock: 60,
    featured: false
  }
];

const CATEGORIES = [
  { id: 1, name: 'Khai vi', icon: 'KV', dishCount: 8 },
  { id: 2, name: 'Mon chinh', icon: 'MC', dishCount: 15 },
  { id: 3, name: 'Lau & Nuong', icon: 'LN', dishCount: 6 },
  { id: 4, name: 'Trang mieng', icon: 'TM', dishCount: 10 },
  { id: 5, name: 'Do uong', icon: 'DU', dishCount: 12 }
];

function App() {
  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const isAdmin = false;

  const filteredDishes = DISHES.filter((dish) => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const matchesKeyword =
      normalizedKeyword === '' ||
      dish.name.toLowerCase().includes(normalizedKeyword) ||
      dish.chef.toLowerCase().includes(normalizedKeyword);
    const matchesCategory = activeCategory === null || dish.categoryId === activeCategory;

    return matchesKeyword && matchesCategory;
  });

  const featuredDishes = filteredDishes.filter((dish) => dish.featured);

  const handleSearch = (nextKeyword) => {
    setKeyword(nextKeyword);
  };

  const handleSelectCategory = (categoryId) => {
    setActiveCategory((currentCategory) =>
      currentCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                categories={CATEGORIES}
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
                categories={CATEGORIES}
                dishes={filteredDishes}
                activeCategory={activeCategory}
                onSearch={handleSearch}
                onSelectCategory={handleSelectCategory}
              />
            }
          />
          <Route path="/books" element={<Navigate to="/menu" replace />} />
          <Route path="/menu/:id" element={<DishDetailPage dishes={DISHES} />} />
          <Route path="/books/:id" element={<DishDetailPage dishes={DISHES} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/admin/dishes"
            element={
              <ProtectedRoute isAllowed={isAdmin}>
                <DishManagePage
                  dishes={DISHES}
                  onAddDish={() => {}}
                  onUpdateDish={() => {}}
                  onDeleteDish={() => {}}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/books" element={<Navigate to="/admin/dishes" replace />} />
          <Route
            path="/promo"
            element={
              <HomePage
                categories={CATEGORIES}
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
                categories={CATEGORIES}
                dishes={featuredDishes}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
