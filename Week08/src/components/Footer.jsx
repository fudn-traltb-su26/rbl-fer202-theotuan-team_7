import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-5">
            <Container>
                <p className="mb-1">&copy; 2026 TastyHub Restaurant. All rights reserved.</p>
                <p className="small text-white-50 mb-0">
                    Địa chỉ: 123 Đường Ẩm Thực, Quận 1, TP. Hồ Chí Minh
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
