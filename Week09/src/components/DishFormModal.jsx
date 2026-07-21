import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const DishFormModal = ({ show, handleClose, onSave, dish }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Món chính');
    const [chef, setChef] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (dish) {
            setName(dish.name);
            setPrice(dish.price);
            setCategory(dish.category);
            setChef(dish.chef);
            setStock(dish.stock);
            setImage(dish.image);
        } else {
            setName('');
            setPrice('');
            setCategory('Món chính');
            setChef('');
            setStock('');
            setImage('https://picsum.photos/seed/dish' + Math.floor(Math.random() * 100) + '/300/200');
        }
    }, [dish, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: dish ? dish.id : Date.now(),
            name,
            price: Number(price),
            category,
            chef,
            stock: Number(stock),
            image,
            featured: dish ? dish.featured : false,
            rating: dish ? dish.rating : 5.0,
            reviewCount: dish ? dish.reviewCount : 0
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{dish ? 'Sửa thông tin món ăn' : 'Thêm món ăn mới'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên món</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên món ăn" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá bán (VNĐ)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Nhập giá bán" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Danh mục thực đơn</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Món chính">Món chính</option>
                            <option value="Khai vị">Khai vị</option>
                            <option value="Lẩu & Nướng">Lẩu & Nướng</option>
                            <option value="Tráng miệng">Tráng miệng</option>
                            <option value="Đồ uống">Đồ uống</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Đầu bếp phụ trách</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên đầu bếp" 
                            value={chef} 
                            onChange={(e) => setChef(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số phần ăn còn lại</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Nhập số lượng trong kho" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ bỏ</Button>
                    <Button variant="danger" type="submit">Lưu lại</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default DishFormModal;
