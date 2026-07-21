import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container className="py-5 text-center">
            <h1 className="display-4 fw-bold">404</h1>
            <p className="lead">Trang khong ton tai</p>
            <Button as={Link} to="/" variant="danger">
                Ve trang chu
            </Button>
        </Container>
    );
};

export default NotFoundPage;
