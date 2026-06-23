import { Card, Col, Container, Row } from 'react-bootstrap';

const CATEGORIES = [
    { id: 1, name: 'Khai vị', icon: 'KV' },
    { id: 2, name: 'Món chính', icon: 'MC' },
    { id: 3, name: 'Lẩu & Nướng', icon: 'LN' },
    { id: 4, name: 'Tráng miệng', icon: 'TM' },
    { id: 5, name: 'Đồ uống', icon: 'DU' }
];

const CategoryList = () => {
    return (
        <section className="py-5 bg-light text-center">
            <Container>
                <h2 className="fw-bold mb-4">Danh Mục Món Ăn</h2>

                {CATEGORIES.length > 0 ? (
                    <Row className="g-3 justify-content-center">
                        {CATEGORIES.map((category) => (
                            <Col key={category.id} xs={6} sm={4} md={2}>
                                <Card className="h-100 border-0 shadow-sm">
                                    <Card.Body>
                                        <div className="fw-bold text-primary-emphasis mb-2">{category.icon}</div>
                                        <Card.Text className="fw-semibold mb-0">{category.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>Không có danh mục nào được tìm thấy.</p>
                )}

                {CATEGORIES.length === 5 && (
                    <p className="text-muted fst-italic mt-4 mb-0">
                        * Chúng tôi đang phục vụ đầy đủ 5 nhóm thực đơn chính.
                    </p>
                )}
            </Container>
        </section>
    );
};

export default CategoryList;
