import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { INITIAL_DISHES } from '../services/mockData';
import SectionWrapper from '../components/SectionWrapper';

const DishDetailPage = ({ onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const dish = INITIAL_DISHES.find((d) => d.id === Number(id));
    
    if (!dish) {
        return (
            <SectionWrapper title="Món ăn không tồn tại">
                <Container className="text-center py-5">
                    <h3 className="text-muted">Rất tiếc, món ăn bạn tìm kiếm không có trong thực đơn.</h3>
                    <Button variant="danger" className="mt-3" onClick={() => navigate('/menu')}>
                        Quay lại thực đơn
                    </Button>
                </Container>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper title="Chi Tiết Món Ăn" subtitle={dish.name}>
            <Container className="py-3">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <Row className="g-0">
                                <Col md={6}>
                                    <Card.Img 
                                        src={dish.image} 
                                        alt={dish.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }} 
                                    />
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="d-flex flex-column h-100 p-4">
                                        <Badge bg="warning" text="dark" className="align-self-start mb-3">
                                            {dish.category}
                                        </Badge>
                                        <h2 className="fw-bold mb-2">{dish.name}</h2>
                                        <p className="text-muted mb-3">Phụ trách bởi: <strong>{dish.chef}</strong></p>
                                        <div className="mb-4">
                                            <span className="h3 text-danger fw-bold">{dish.price.toLocaleString('vi-VN')}đ</span>
                                            {dish.originalPrice > dish.price && (
                                                <span className="text-muted text-decoration-line-through ms-3">
                                                    {dish.originalPrice.toLocaleString('vi-VN')}đ
                                                </span>
                                            )}
                                        </div>
                                        <p className="mb-4 text-muted">
                                            Đánh giá: <strong>{dish.rating} ⭐</strong> ({dish.reviewCount} lượt đánh giá).
                                            Số phần ăn còn sẵn: <strong>{dish.stock} phần</strong>.
                                        </p>
                                        <div className="mt-auto d-grid gap-2">
                                            <Button 
                                                variant="danger" 
                                                size="lg" 
                                                onClick={() => onAddToCart(dish)}
                                                disabled={dish.stock === 0}
                                            >
                                                {dish.stock === 0 ? 'Tạm hết món' : 'Thêm vào giỏ hàng'}
                                            </Button>
                                            <Button variant="outline-secondary" onClick={() => navigate('/menu')}>
                                                Quay lại thực đơn
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </SectionWrapper>
    );
};

export default DishDetailPage;
