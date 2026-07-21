import { Badge, Button, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const DishCard = ({ dish }) => {
    const { addToCart, toggleWishlist, isWishlisted } = useCart();
    const { theme } = useTheme();
    const hasDiscount = dish.originalPrice > dish.price;
    const discountPercent = Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100);
    const isOutOfStock = dish.stock === 0;
    const favorited = isWishlisted(dish.id);

    return (
        <Card className={`h-100 border-0 shadow-sm position-relative ${theme === 'dark' ? 'bg-secondary text-white border-secondary' : 'bg-white text-dark'}`}>
            <Stack direction="horizontal" className="position-absolute top-0 w-100 justify-content-between p-2" style={{ zIndex: 5 }}>
                <div>
                    {hasDiscount && (
                        <Badge bg="danger">
                            -{discountPercent}%
                        </Badge>
                    )}
                </div>
                <Button 
                    variant="light" 
                    size="sm" 
                    className="rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center" 
                    onClick={() => toggleWishlist(dish)}
                    style={{ width: '32px', height: '32px' }}
                >
                    {favorited ? '❤️' : '🤍'}
                </Button>
            </Stack>
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
                    <Link 
                        to={`/dish/${dish.id}`} 
                        className={`text-decoration-none ${theme === 'dark' ? 'text-white' : 'text-dark'} header-hover-danger`}
                    >
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
                    onClick={() => addToCart(dish)}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Tạm hết món' : 'Thêm vào giỏ'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DishCard;
