import { useEffect } from 'react';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { selectTotalItems } from '../store/cartSlice';

const prefetchMenu = () => import('../pages/MenuPage');
const prefetchCart = () => import('../pages/CartPage');
const prefetchAdmin = () => import('../pages/DishManagePage');

const Header = () => {
    const totalItems = useSelector(selectTotalItems);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        document.title = totalItems > 0 ? `(${totalItems}) TastyHub Restaurant` : 'TastyHub Restaurant';

        return () => {
            document.title = 'TastyHub Restaurant';
        };
    }, [totalItems]);

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
                        <Nav.Link as={NavLink} to="/menu" onMouseEnter={prefetchMenu}>
                            Thuc don
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/cart" onMouseEnter={prefetchCart}>
                            Gio hang
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/dishes" onMouseEnter={prefetchAdmin}>
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
