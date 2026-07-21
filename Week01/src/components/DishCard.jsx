import { Badge, Button, Card, Stack } from 'react-bootstrap';

const DishCard = ({ dish, onAddToCart = () => {} }) => {
    const hasDiscount = dish.originalPrice > dish.price;
    const discountPercent = Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100);
    const isOutOfStock = dish.stock === 0;

    return (
        <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
            {hasDiscount && (
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                    -{discountPercent}%
                </Badge>
            )}
            <Card.Img
                variant="top"
                src={dish.image}
                alt={dish.name}
                className="dish-card-img"
            />
            <Card.Body className="d-flex flex-column">
                <Badge bg="info" text="dark" className="align-self-start mb-2">
                    {dish.category}
                </Badge>
                <Card.Title className="fw-bold fs-6">{dish.name}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">{dish.chef}</Card.Subtitle>
                <Card.Text className="small text-muted mb-2">
                    {dish.rating} sao ({dish.reviewCount} danh gia) - Con {dish.stock} phan
                </Card.Text>
                <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
                    <span className="fw-bold text-danger">{dish.price.toLocaleString('vi-VN')}d</span>
                    {hasDiscount && (
                        <span className="text-muted text-decoration-line-through small">
                            {dish.originalPrice.toLocaleString('vi-VN')}d
                        </span>
                    )}
                </Stack>
                <Button
                    variant="primary"
                    size="sm"
                    className="w-100 mt-auto"
                    onClick={() => onAddToCart(dish)}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Tam het mon' : 'Them vao gio'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DishCard;
