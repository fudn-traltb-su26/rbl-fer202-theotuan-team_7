import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

const DISHES = [
  {
    id: 1,
    name: 'Phở Bò Tái Lăn',
    chef: 'Đầu bếp Nguyễn',
    price: 65000,
    originalPrice: 75000,
    category: 'Món chính',
    categoryId: 2,
    image: 'https://picsum.photos/seed/dish1/300/200',
    rating: 4.8,
    reviewCount: 142,
    stock: 50,
    featured: true
  },
  {
    id: 2,
    name: 'Bún Chả Hà Nội',
    chef: 'Đầu bếp Trần',
    price: 55000,
    originalPrice: 65000,
    category: 'Món chính',
    categoryId: 2,
    image: 'https://picsum.photos/seed/dish2/300/200',
    rating: 4.7,
    reviewCount: 210,
    stock: 40,
    featured: true
  },
  {
    id: 3,
    name: 'Nem Rán Hà Nội',
    chef: 'Đầu bếp Lê',
    price: 45000,
    originalPrice: 50000,
    category: 'Khai vị',
    categoryId: 1,
    image: 'https://picsum.photos/seed/dish3/300/200',
    rating: 4.6,
    reviewCount: 85,
    stock: 100,
    featured: false
  },
  {
    id: 4,
    name: 'Lẩu Thái Hải Sản',
    chef: 'Đầu bếp Phạm',
    price: 350000,
    originalPrice: 399000,
    category: 'Lẩu & Nướng',
    categoryId: 3,
    image: 'https://picsum.photos/seed/dish4/300/200',
    rating: 4.9,
    reviewCount: 64,
    stock: 15,
    featured: true
  }
];

const CATEGORIES = [
  { id: 1, name: 'Khai vị', icon: 'KV', dishCount: 8 },
  { id: 2, name: 'Món chính', icon: 'MC', dishCount: 15 },
  { id: 3, name: 'Lẩu & Nướng', icon: 'LN', dishCount: 6 },
  { id: 4, name: 'Tráng miệng', icon: 'TM', dishCount: 10 },
  { id: 5, name: 'Đồ uống', icon: 'DU', dishCount: 12 }
];

function App() {
  const featuredDishes = DISHES.filter((dish) => dish.featured);

  const handleAddToCart = (dish) => {
    console.log('Thêm vào giỏ hàng:', dish);
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
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                categories={CATEGORIES}
                dishes={DISHES}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/promo"
            element={
              <HomePage
                categories={CATEGORIES}
                dishes={featuredDishes}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <HomePage
                categories={CATEGORIES}
                dishes={featuredDishes}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
