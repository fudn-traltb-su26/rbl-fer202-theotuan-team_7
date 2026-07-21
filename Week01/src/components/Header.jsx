import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
    const { totalItems } = useCart();
    const { isDark, toggleTheme } = useTheme();

    return (
        <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow-sm py-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                    TastyHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navigation" />
                <Navbar.Collapse id="main-navigation">
                    <Nav className="mx-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Trang chu
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/menu">
                            Thuc don
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/cart">
                            Gio hang
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/dishes">
                            Admin
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/promo">
                            Khuyen mai
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">
                            Lien he
                        </Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-md-center gap-2 pt-3 pt-md-0">
                        <Button
                            variant={isDark ? 'outline-light' : 'warning'}
                            size="sm"
                            onClick={toggleTheme}
                        >
                            {isDark ? 'Light' : 'Dark'}
                        </Button>
                        <NavLink to="/cart" className="fw-semibold text-light text-decoration-none">
                            Gio hang{' '}
                            {totalItems > 0 && (
                                <Badge bg="danger" pill>
                                    {totalItems}
                                </Badge>
                            )}
                        </NavLink>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
