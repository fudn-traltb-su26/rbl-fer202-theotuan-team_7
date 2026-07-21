import { Badge, Button, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DishDetailPage = ({ dishes = [], onAddToCart = () => {} }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dish = dishes.find((item) => item.id === Number(id));

    if (!dish) {
        return (
            <Container className="py-5 text-center">
                <h1 className="fw-bold mb-3">Khong tim thay mon an</h1>
                <p className="text-muted">Mon an voi ma #{id} khong ton tai trong thuc don.</p>
                <Button as={Link} to="/menu" variant="danger">
                    Quay lai thuc don
                </Button>
            </Container>
        );
    }

    const hasDiscount = dish.originalPrice > dish.price;

    return (
        <Container className="py-5">
            <nav className="mb-4 small">
                <Link to="/" className="text-decoration-none">Trang chu</Link>
                <span className="mx-2 text-muted">/</span>
                <Link to="/menu" className="text-decoration-none">Thuc don</Link>
                <span className="mx-2 text-muted">/</span>
                <span className="text-muted">{dish.name}</span>
            </nav>

            <Row className="g-4 align-items-start">
                <Col md={6}>
                    <Image src={dish.image} alt={dish.name} fluid rounded className="shadow-sm w-100 detail-image" />
                </Col>
                <Col md={6}>
                    <Badge bg="info" text="dark" className="mb-3">{dish.category}</Badge>
                    <h1 className="fw-bold">{dish.name}</h1>
                    <p className="text-muted mb-2">{dish.chef}</p>
                    <p className="text-muted">
                        {dish.rating} sao - {dish.reviewCount} danh gia - Con {dish.stock} phan
                    </p>
                    <Stack direction="horizontal" gap={3} className="mb-4 flex-wrap">
                        <span className="fs-3 fw-bold text-danger">{dish.price.toLocaleString('vi-VN')}d</span>
                        {hasDiscount && (
                            <span className="fs-5 text-muted text-decoration-line-through">
                                {dish.originalPrice.toLocaleString('vi-VN')}d
                            </span>
                        )}
                    </Stack>
                    <p>
                        Mon {dish.name} duoc chuan bi moi moi ngay, phu hop cho ca bua trua nhanh va bua toi cung gia dinh.
                    </p>
                    <Stack direction="horizontal" gap={2} className="flex-wrap">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                            Quay lai
                        </Button>
                        <Button variant="danger" onClick={() => onAddToCart(dish)} disabled={dish.stock === 0}>
                            Them vao gio
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default DishDetailPage;
