# Giao Diện Responsive - Tuần 05

TastyHub đã được tối ưu hóa giao diện đáp ứng (responsive layout) trên 3 breakpoints chính:

1. **Mobile (375px - iPhone SE):**
   - Header thu gọn thành menu Hamburger (Navbar.Toggle & Navbar.Collapse).
   - Danh sách món ăn hiển thị dưới dạng Grid 2 cột (`xs={2}`).
   - Các nút "Thêm vào giỏ" căn đều tự động dưới chân thẻ Card.

2. **Tablet (768px - iPad):**
   - Header hiển thị thanh điều hướng ngang đầy đủ.
   - Danh sách món ăn hiển thị dưới dạng Grid 3 cột (`sm={3}`).

3. **Desktop (1280px):**
   - Grid món ăn hiển thị 4 cột (`md={4}`) hoặc 5 cột (`lg={5}`).
   - Bảng quản trị Admin (`DishTable.jsx`) hiển thị đầy đủ thông tin chi tiết.
