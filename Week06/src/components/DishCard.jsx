import { Badge, Button, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DishCard = ({ dish, onAddToCart }) => {
    const hasDiscount = dish.originalPrice > dish.price;
    const discountPercent = Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100);
    const isOutOfStock = dish.stock === 0;

    return (
        <Card className="h-100 border-0 shadow-sm position-relative">
            {hasDiscount && (
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                    -{discountPercent}%
                </Badge>
            )}
            <Link to={`/dish/${dish.id}`}>
                <Card.Img 
                    variant="top" 
                    src={dish.image} 
                    alt={dish.name} 
                    style={{ height: '180px', objectFit: 'cover', cursor: 'pointer' }} 
                />
            </Link>
            <Card.Body className="d-flex flex-column">
                <Badge bg="warning" text="dark" className="align-self-start mb-2">
                    {dish.category}
                </Badge>
                <Card.Title className="fw-bold fs-6">
                    <Link to={`/dish/${dish.id}`} className="text-decoration-none text-dark header-hover-danger">
                        {dish.name}
                    </Link>
                </Card.Title>
                <Card.Text className="text-muted mb-2 small">{dish.chef}</Card.Text>
                <Card.Text className="small text-muted mb-2">
                    {dish.rating} ⭐ ({dish.reviewCount} đánh giá)
                </Card.Text>
                <Stack direction="horizontal" gap={2} className="mb-3">
                    <span className="fw-bold text-danger">{dish.price.toLocaleString('vi-VN')}đ</span>
                    {hasDiscount && (
                        <span className="text-muted text-decoration-line-through small">
                            {dish.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                    )}
                </Stack>
                <Button
                    variant="danger"
                    className="mt-auto"
                    onClick={() => onAddToCart(dish)}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Tạm hết món' : 'Thêm vào giỏ'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DishCard;
