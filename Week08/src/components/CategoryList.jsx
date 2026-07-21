import { Card, Col, Row } from 'react-bootstrap';

const CategoryList = ({ categories }) => {
    return (
        <div className="text-center">
            {categories.length > 0 ? (
                <Row className="g-3 justify-content-center">
                    {categories.map((category) => (
                        <Col key={category.id} xs={6} sm={4} md={2}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <div className="fw-bold text-primary-emphasis mb-2">{category.icon}</div>
                                    <Card.Text className="fw-semibold mb-1">{category.name}</Card.Text>
                                    <Card.Text className="text-muted small mb-0">{category.dishCount} món</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Không có danh mục nào được tìm thấy.</p>
            )}

            {categories.length === 5 && (
                <p className="text-muted fst-italic mt-4 mb-0">
                    * Chúng tôi đang phục vụ đầy đủ 5 nhóm thực đơn chính.
                </p>
            )}
        </div>
    );
};

export default CategoryList;
