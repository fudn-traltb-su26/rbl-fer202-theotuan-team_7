import { Button, Card, Col, Row } from 'react-bootstrap';

const CategoryList = ({
    categories = [],
    activeCategory = null,
    onSelectCategory = () => {}
}) => {
    return (
        <div className="text-center">
            {categories.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <Button
                        variant={activeCategory === null ? 'danger' : 'outline-danger'}
                        onClick={() => onSelectCategory(null)}
                    >
                        Tat ca
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={activeCategory === category.id ? 'danger' : 'outline-danger'}
                            onClick={() => onSelectCategory(category.id)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            )}

            {categories.length > 0 ? (
                <Row className="g-3 justify-content-center">
                    {categories.map((category) => (
                        <Col key={category.id} xs={6} sm={4} md={2}>
                            <Card
                                className={`h-100 border-0 shadow-sm ${activeCategory === category.id ? 'bg-danger-subtle' : ''}`}
                                role="button"
                                onClick={() => onSelectCategory(category.id)}
                            >
                                <Card.Body>
                                    <div className="fw-bold text-primary-emphasis mb-2">{category.icon}</div>
                                    <Card.Text className="fw-semibold mb-1">{category.name}</Card.Text>
                                    <Card.Text className="text-muted small mb-0">{category.dishCount} mon</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Khong co danh muc nao duoc tim thay.</p>
            )}

            {categories.length === 5 && (
                <p className="text-muted fst-italic mt-4 mb-0">
                    * Chon danh muc de loc thuc don; bam lai danh muc dang chon de bo loc.
                </p>
            )}
        </div>
    );
};

export default CategoryList;
