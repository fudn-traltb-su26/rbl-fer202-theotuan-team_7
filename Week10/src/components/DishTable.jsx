import { Table, Button } from 'react-bootstrap';

const DishTable = ({ dishes, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive className="align-middle">
            <thead className="table-dark">
                <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên món</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Đầu bếp</th>
                    <th>Còn lại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dishes.map((dish, index) => (
                    <tr key={dish.id}>
                        <td>{index + 1}</td>
                        <td>
                            <img 
                                src={dish.image} 
                                alt={dish.name} 
                                style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                        </td>
                        <td className="fw-bold">{dish.name}</td>
                        <td>{dish.category}</td>
                        <td className="text-danger fw-semibold">{dish.price.toLocaleString('vi-VN')}đ</td>
                        <td>{dish.chef}</td>
                        <td>{dish.stock}</td>
                        <td>
                            <Button 
                                variant="warning" 
                                size="sm" 
                                className="me-2 text-white" 
                                onClick={() => onEdit(dish)}
                            >
                                Sửa
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={() => onDelete(dish.id)}
                            >
                                Xóa
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DishTable;
