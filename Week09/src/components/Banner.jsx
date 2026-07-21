import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Banner = () => {
    const bannerStyle = {
        background: 'linear-gradient(135deg, #ff5722 0%, #ff9800 100%)',
        color: 'white'
    };

    return (
        <section style={bannerStyle} className="py-5 text-center">
            <Container className="py-5">
                <h1 className="display-4 fw-bold mb-3">Hương Vị Việt Trong Từng Cung Bậc</h1>
                <p className="lead mx-auto mb-4" style={{ maxWidth: '800px' }}>
                    Khám phá thực đơn đa dạng từ những món truyền thống đậm đà đến những sáng tạo ẩm thực hiện đại.
                    TastyHub cam kết mang đến trải nghiệm tuyệt vời nhất cho thực khách.
                </p>
                <Button as={Link} to="/menu" variant="light" size="lg" className="fw-bold text-primary-emphasis">
                    Khám phá ngay
                </Button>
            </Container>
        </section>
    );
};

export default Banner;
