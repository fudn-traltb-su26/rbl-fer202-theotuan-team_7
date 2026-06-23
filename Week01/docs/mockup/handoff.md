# Handoff Document - TastyHub Restaurant Mockup to React Components

Figma Link: [Restaurant-Manager-System (Figma)](https://www.figma.com/design/yHWx591dOILaLqhwnlUizo/Restaurant-Manager-System)

This document maps mockup regions/components to React files and sets the execution timeline.

---

## Component Mapping Table

| Mockup Region / Element | React Component / Page File | Timeline (Week) | Responsibility / Description |
| :--- | :--- | :--- | :--- |
| **Top Navbar (Global Header)** | `Header.jsx` ([NEW] in `src/components/`) | **Week 2** (Static), **Week 5** (Bootstrap), **Week 7** (Context) | Contains Logo, Nav links, and Cart badge. Connects to `CartContext` to show total dishes ordered. |
| **Hero Section (Home)** | `Banner.jsx` ([NEW] in `src/components/`) | **Week 2** (Static/Inline CSS), **Week 5** (Bootstrap) | High impact food illustration and 'Xem thực đơn' CTA. |
| **Categories Section (Home)** | `CategoryList.jsx` ([NEW] in `src/components/`) | **Week 2** (Static list), **Week 3** (Props map), **Week 4** (Filter click) | Displays 5 categories (Khai vị, Món chính...). Updates `activeCategory` state. |
| **Dish Grid (Home / Menu)** | `BookGrid.jsx` -> `DishGrid.jsx` ([NEW] in `src/components/`) | **Week 2** (Mock list), **Week 3** (Props flow) | Grid layout for dish cards. Implements responsive row/cols and empty states. |
| **Dish Card (Reusable)** | `BookCard.jsx` -> `DishCard.jsx` ([NEW] in `src/components/`) | **Week 2** (Hardcode), **Week 3** (Props refactor), **Week 5** (Bootstrap Card) | Renders dish details (name, photo, prices, rating) and 'Thêm vào giỏ' button. |
| **Search Form (Menu)** | `SearchBar.jsx` ([NEW] in `src/components/`) | **Week 4** (Controlled inputs) | Controlled search input with validation (minimum 2 chars) and clear (x) button. |
| **Dish Detail Screen** | `BookDetailPage.jsx` -> `DishDetailPage.jsx` ([NEW] in `src/pages/`) | **Week 6** (Routing + useParams), **Week 8** (Axios CRUD) | Displays dish specs and ingredients. Fetches data using `useParams()` and Axios service. |
| **Order Cart Screen** | `CartPage.jsx` ([NEW] in `src/pages/`) | **Week 6** (Table layout), **Week 7** (Context update) | Tabular cart layout showing quantities with adjust buttons (+/-), totals, and Order placement. |

---

## Mockup Files Reference

All exported mockups are stored in `docs/mockup/`:
- `homepage.png` (Trang chủ)
- `booklist.png` (Thực đơn / Bộ lọc)
- `detail.png` (Chi tiết món ăn)
- `cart.png` (Giỏ hàng / Đơn hàng)
