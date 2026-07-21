# Week03 - Props & Component Communication

## Data flow chính

```text
App.jsx
  ├─ categories={CATEGORIES}
  │    └─ HomePage/MenuPage
  │         └─ CategoryList
  │              └─ category card
  │
  ├─ dishes={DISHES hoặc featuredDishes}
  │    └─ HomePage/MenuPage
  │         └─ DishGrid
  │              └─ DishCard
  │
  └─ onAddToCart={handleAddToCart}
       └─ HomePage/MenuPage
            └─ DishGrid
                 └─ DishCard
                      └─ Button onClick={() => onAddToCart(dish)}
```

## Component đã refactor

| Component | Props nhận vào | Vai trò |
| --- | --- | --- |
| `HomePage` | `categories`, `dishes`, `onAddToCart` | Nhận dữ liệu từ route và truyền xuống các section |
| `MenuPage` | `categories`, `dishes`, `onAddToCart` | Hiển thị toàn bộ thực đơn bằng dữ liệu props |
| `SectionWrapper` | `title`, `subtitle`, `backgroundColor`, `children` | Layout component dùng `props.children` |
| `CategoryList` | `categories` | Render danh mục từ props, không còn hardcode trong component |
| `DishGrid` | `dishes`, `onAddToCart` | Render danh sách món bằng `map()` và truyền từng món xuống `DishCard` |
| `DishCard` | `dish`, `onAddToCart` | Hiển thị thông tin món, badge giảm giá, trạng thái hết món và sự kiện thêm giỏ |

## Ghi chú kiểm thử

- `npm run lint`: không có lỗi ESLint.
- `npm run build`: build production thành công.
- Click nút `Thêm vào giỏ` sẽ gọi callback từ `App.jsx` và log món ăn được chọn ra console.
