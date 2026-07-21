import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="app-hero text-white text-center">
            <Container className="py-5">
                <h1 className="display-5 display-md-4 fw-bold mb-3">
                    Huong Vi Viet Trong Tung Bua An
                </h1>
                <p className="lead app-hero-copy mx-auto mb-4">
                    Kham pha thuc don da dang tu nhung mon truyen thong dam da den nhung lua chon hien dai.
                    TastyHub mang den trai nghiem goi mon nhanh, gon va than thien tren moi thiet bi.
                </p>
                <Button as={Link} to="/menu" variant="light" size="lg" className="fw-bold text-danger">
                    Kham pha ngay
                </Button>
            </Container>
        </section>
    );
};

export default Banner;
