# Báo Cáo Tuần 05: React-Bootstrap & Tùy biến Giao diện

Dưới đây là danh sách các React-Bootstrap components đã được sử dụng và tùy biến trong dự án **TastyHub**.

## 1. Danh sách các components sử dụng

| Tên Component | Mục đích sử dụng | Vị trí file |
|---|---|---|
| `Navbar`, `Nav` | Rebuild thanh điều hướng chính, hỗ trợ responsive thu gọn menu | `src/components/Header.jsx` |
| `Container` | Căn giữa và giới hạn chiều rộng nội dung trang | Toàn bộ ứng dụng |
| `Row`, `Col` | Tạo hệ thống Grid linh hoạt, chia cột thích ứng theo kích thước | `src/components/DishGrid.jsx`, `src/components/CategoryList.jsx` |
| `Card` | Hiển thị thông tin món ăn và danh mục dưới dạng thẻ | `src/components/DishCard.jsx`, `src/components/CategoryList.jsx` |
| `Badge` | Hiển thị số lượng giỏ hàng và danh mục món ăn | `src/components/Header.jsx`, `src/components/DishCard.jsx` |
| `Button` | Nút hành động thêm giỏ, tìm kiếm, lưu, sửa, xoá | Toàn bộ ứng dụng |
| `Form`, `InputGroup` | Xây dựng thanh tìm kiếm có validation và modal nhập dữ liệu | `src/components/SearchBar.jsx`, `src/components/DishFormModal.jsx` |
| `Table` | Hiển thị danh sách món ăn quản trị dạng bảng | `src/components/DishTable.jsx` |
| `Modal` | Hộp thoại popup thêm/sửa món ăn của Admin | `src/components/DishFormModal.jsx` |

---

## 2. Các đoạn Code Snippet tiêu biểu & Cách Tùy Biến

### 2.1. Tùy biến Breakpoints cho Grid Món ăn (`DishGrid.jsx`)
Sử dụng các thuộc tính `xs`, `sm`, `md`, `lg` của `Row` kết hợp với class chiều cao `h-100` của `Card` để giao diện đồng đều.
```jsx
<Row xs={2} sm={3} md={4} lg={5} className="g-3">
    {dishes.map((dish) => (
        <Col key={dish.id} className="h-100">
            <DishCard dish={dish} onAddToCart={onAddToCart} />
        </Col>
    ))}
</Row>
```

### 2.2. Thanh tìm kiếm có validation (`SearchBar.jsx`)
Sử dụng `InputGroup` và `Form.Control.Feedback` để hiển thị lỗi validation khi từ khóa tìm kiếm quá ngắn (dưới 2 ký tự).
```jsx
<InputGroup hasValidation>
    <Form.Control
        type="text"
        placeholder="Tìm món ăn ngon..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        isInvalid={!!error}
    />
    <Button variant="danger" type="submit">Tìm kiếm</Button>
    <Form.Control.Feedback type="invalid">
        {error}
    </Form.Control.Feedback>
</InputGroup>
```

### 2.3. Bảng Quản trị Admin (`DishTable.jsx`)
Sử dụng thuộc tính `striped`, `bordered`, `hover`, và `responsive` của `Table` để tự động tạo thanh cuộn ngang khi màn hình quá hẹp.
```jsx
<Table striped bordered hover responsive className="align-middle">
    <thead className="table-dark">
        <tr>
            <th>STT</th>
            <th>Hình ảnh</th>
            <th>Tên món</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Hành động</th>
        </tr>
    </thead>
    <tbody>
        {/* Render rows... */}
    </tbody>
</Table>
```
