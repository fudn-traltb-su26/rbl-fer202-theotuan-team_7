import { Badge, Button, Card, Stack } from 'react-bootstrap';

const DEFAULT_DISH = {
    id: 1,
    name: 'Phở Bò Tái Lăn',
    chef: 'Đầu bếp Nguyễn',
    price: 65000,
    originalPrice: 75000,
    image: 'https://picsum.photos/id/102/300/200',
    category: 'Món chính'
};

const DishCard = ({ dish = DEFAULT_DISH }) => {
    return (
        <Card className="h-100 border-0 shadow-sm">
            <Card.Img
                variant="top"
                src={dish.image}
                alt={dish.name}
                style={{ height: '180px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Badge bg="warning" text="dark" className="align-self-start mb-2">
                    {dish.category}
                </Badge>
                <Card.Title className="fw-bold">{dish.name}</Card.Title>
                <Card.Text className="text-muted mb-2">{dish.chef}</Card.Text>
                <Stack direction="horizontal" gap={2} className="mb-3">
                    <span className="fw-bold text-danger">{dish.price.toLocaleString('vi-VN')}đ</span>
                    <span className="text-muted text-decoration-line-through">
                        {dish.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                </Stack>
                <Button variant="danger" className="mt-auto">
                    Thêm vào giỏ
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DishCard;
