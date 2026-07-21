import { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const defaultImage = () => (
    'https://picsum.photos/seed/dish' + Math.floor(Math.random() * 100) + '/300/200'
);

const categoryMap = {
    'Khai vi': 1,
    'Mon chinh': 2,
    'Lau & Nuong': 3,
    'Trang mieng': 4,
    'Do uong': 5
};

const DishFormModal = ({ show, handleClose, onSave, dish }) => {
    const [name, setName] = useState(dish?.name ?? '');
    const [price, setPrice] = useState(dish?.price ?? '');
    const [originalPrice, setOriginalPrice] = useState(dish?.originalPrice ?? '');
    const [category, setCategory] = useState(dish?.category ?? 'Mon chinh');
    const [chef, setChef] = useState(dish?.chef ?? '');
    const [stock, setStock] = useState(dish?.stock ?? '');
    const [image] = useState(dish?.image ?? defaultImage);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextPrice = Number(price);
        const nextOriginalPrice = Number(originalPrice || price);

        onSave({
            ...dish,
            name,
            price: nextPrice,
            originalPrice: nextOriginalPrice,
            category,
            categoryId: categoryMap[category] ?? 2,
            chef,
            stock: Number(stock),
            image,
            featured: dish ? dish.featured : false,
            rating: dish ? dish.rating : 5.0,
            reviewCount: dish ? dish.reviewCount : 0,
            description: dish?.description ?? `${name} duoc che bien moi moi ngay tai TastyHub.`
        });
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
                    <Row>
                        <Col sm={6}>
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
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Gia goc (VND)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhap gia goc"
                                    value={originalPrice}
                                    onChange={(e) => setOriginalPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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
                    <Row>
                        <Col sm={7}>
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
                        </Col>
                        <Col sm={5}>
                            <Form.Group className="mb-3">
                                <Form.Label>So phan con lai</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="So luong"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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
