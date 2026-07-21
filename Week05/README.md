# 🍔 TastyHub - Hệ thống quản lý và đặt món nhà hàng trực tuyến

Dự án môn học Lập trình Web với ReactJS (FER202) - Thiết kế và xây dựng website hệ thống đặt món và quản lý thực đơn nhà hàng "TastyHub" sử dụng mô hình SPA (Single Page Application).

---

## 🌟 Tính năng chính (Lộ trình 10 tuần)

1. **Khởi tạo & Giao diện tĩnh (Tuần 1 - 2):** Cấu hình Vite React, React-Bootstrap, tạo các components cơ bản (Header, Footer, Banner, Card Món ăn).
2. **Quản lý dữ liệu (Tuần 3 - 4):** Truyền dữ liệu qua props, tương tác tìm kiếm (SearchBar), bộ lọc danh mục và sự kiện "Đặt món / Thêm vào giỏ".
3. **Responsive & Routing (Tuần 5 - 6):** Tối ưu giao diện mobile/tablet, cài đặt phân trang và định tuyến trang Chi tiết món ăn, Giỏ hàng, Admin.
4. **Trạng thái toàn cục (Tuần 7):** Quản lý đơn hàng với `CartContext` & đổi theme Dark/Light với `ThemeContext`.
5. **API & REST Client (Tuần 8):** Kết nối cơ sở dữ liệu giả lập thực đơn `db.json` thông qua Axios và `json-server`. Thực hiện trọn vẹn CRUD món ăn của Admin.
6. **Custom Hooks & Tối ưu (Tuần 9):** Tự định nghĩa `useFetch`, `useDebounce`, `useLocalStorage` lưu trữ món ăn yêu thích (Wishlist).
7. **Nâng cao (Tuần 10):** Quản lý state tập trung bằng Redux Toolkit, Lazy Loading tối ưu hiệu năng và deploy lên Vercel.

---

## 🛠️ Công nghệ sử dụng

- **Core:** React 18 (Cấu hình bởi Vite)
- **UI Framework:** React-Bootstrap 2.x & Bootstrap 5
- **Routing:** React Router Dom v6
- **HTTP Client:** Axios
- **Database Server (Mock):** JSON-Server

---

## 📁 Cấu trúc thư mục

```text
Week01/
├── public/                  # Assets công cộng tĩnh
├── src/
│   ├── assets/              # Hình ảnh, biểu tượng cục bộ
│   ├── components/          # Các Component tái sử dụng (Header, DishCard, SearchBar...)
│   ├── pages/               # Các trang chính (HomePage, DishDetailPage, CartPage...)
│   ├── context/             # Quản lý State toàn cục (CartContext, ThemeContext)
│   ├── hooks/               # Các Custom Hooks tự định nghĩa (useFetch, useDebounce...)
│   ├── services/            # Tách biệt API Layer (dishService...)
│   ├── App.jsx              # Định cấu hình chính, routes, state
│   ├── App.css              # File CSS tùy chỉnh
│   ├── index.css            # File CSS toàn cục
│   └── main.jsx             # Điểm khởi tạo React DOM
├── docs/
│   ├── mockup/              # Bản vẽ giao diện (PNG) & prompts log, handoff doc
│   └── component-tree.png   # Sơ đồ cấu trúc Component
├── db.json                  # Dữ liệu giả lập thực đơn và danh mục món ăn
├── package.json             # Khai báo thư viện phụ thuộc & scripts
└── vite.config.js           # Cấu hình Vite bundler
```

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### Yêu cầu hệ thống
- Cài đặt **Node.js** phiên bản 18 trở lên. Kiểm tra bằng cách chạy:
  ```bash
  node -v
  ```

### Các bước thực hiện:

1. **Di chuyển vào thư mục dự án:**
   ```bash
   cd Week01
   ```

2. **Cài đặt các thư viện cần thiết:**
   ```bash
   npm install
   ```

3. **Khởi chạy ứng dụng Web (Client):**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ mặc định: [http://localhost:5173](http://localhost:5173)

4. **Khởi chạy máy chủ dữ liệu mock (Server):**
   Mở thêm một terminal mới tại thư mục `Week01` và chạy:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
   Hoặc chạy lệnh script tích hợp sẵn:
   ```bash
   npm run server
   ```
   API món ăn và danh mục sẽ hiển thị tại: [http://localhost:3001/dishes](http://localhost:3001/dishes)
