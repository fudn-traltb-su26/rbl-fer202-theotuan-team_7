import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = ({ cartCount = 0 }) => {
    return (
        <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary-emphasis">
                    🍔 TastyHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navigation" />
                <Navbar.Collapse id="main-navigation">
                    <Nav className="mx-auto">
                        <Nav.Link as={NavLink} to="/">Trang chủ</Nav.Link>
                        <Nav.Link as={NavLink} to="/menu">Thực đơn</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Quản lý</Nav.Link>
                    </Nav>
                    <div className="fw-semibold">
                        Giỏ hàng <Badge bg="danger" pill>{cartCount}</Badge>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
