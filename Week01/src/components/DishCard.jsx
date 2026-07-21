import { Badge, Button, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DishCard = ({ dish }) => {
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useLocalStorage('tastyhub_wishlist', []);
    const hasDiscount = dish.originalPrice > dish.price;
    const discountPercent = Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100);
    const isOutOfStock = dish.stock === 0;
    const dishId = String(dish.id);
    const isWishlisted = wishlist.includes(dishId);

    const handleToggleWishlist = () => {
        setWishlist((currentWishlist) =>
            currentWishlist.includes(dishId)
                ? currentWishlist.filter((id) => id !== dishId)
                : [...currentWishlist, dishId]
        );
    };

    return (
        <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
            {hasDiscount && (
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                    -{discountPercent}%
                </Badge>
            )}
            <Button
                variant={isWishlisted ? 'danger' : 'light'}
                size="sm"
                className="position-absolute top-0 end-0 m-2 rounded-circle wishlist-button"
                onClick={handleToggleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                {isWishlisted ? '♥' : '♡'}
            </Button>
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
                <div className="mt-auto d-grid gap-2">
                    <Button as={Link} to={`/menu/${dish.id}`} variant="outline-primary" size="sm">
                        Xem chi tiet
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-100"
                        onClick={() => addToCart(dish)}
                        disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'Tam het mon' : 'Them vao gio'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DishCard;
