import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const defaultImage = () => (
    'https://picsum.photos/seed/dish' + Math.floor(Math.random() * 100) + '/300/200'
);

const DishFormModal = ({ show, handleClose, onSave, dish }) => {
    const [name, setName] = useState(dish?.name ?? '');
    const [price, setPrice] = useState(dish?.price ?? '');
    const [category, setCategory] = useState(dish?.category ?? 'Mon chinh');
    const [chef, setChef] = useState(dish?.chef ?? '');
    const [stock, setStock] = useState(dish?.stock ?? '');
    const [image] = useState(dish?.image ?? defaultImage);

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
                <Modal.Title>{dish ? 'Sua thong tin mon an' : 'Them mon an moi'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Ten mon</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhap ten mon an"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gia ban (VND)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Nhap gia ban"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Danh muc thuc don</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Mon chinh">Mon chinh</option>
                            <option value="Khai vi">Khai vi</option>
                            <option value="Lau & Nuong">Lau & Nuong</option>
                            <option value="Trang mieng">Trang mieng</option>
                            <option value="Do uong">Do uong</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dau bep phu trach</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhap ten dau bep"
                            value={chef}
                            onChange={(e) => setChef(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>So phan an con lai</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Nhap so luong trong kho"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huy bo</Button>
                    <Button variant="danger" type="submit">Luu lai</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default DishFormModal;
