import { Badge, Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ isLoggedIn, onToggleLogin }) => {
    const { totalCartCount } = useCart();
    const { theme, toggleTheme } = useTheme();

    return (
        <Navbar 
            bg={theme === 'dark' ? 'dark' : 'white'} 
            variant={theme === 'dark' ? 'dark' : 'light'} 
            expand="lg" 
            sticky="top" 
            className="shadow-sm py-3"
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary-emphasis">
                    🍔 TastyHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navigation" />
                <Navbar.Collapse id="main-navigation">
                    <Nav className="mx-auto">
                        <Nav.Link 
                            as={NavLink} 
                            to="/" 
                            end 
                            className={({ isActive }) => isActive ? "fw-bold text-danger nav-link" : "nav-link"}
                        >
                            Trang chủ
                        </Nav.Link>
                        <Nav.Link 
                            as={NavLink} 
                            to="/menu" 
                            className={({ isActive }) => isActive ? "fw-bold text-danger nav-link" : "nav-link"}
                        >
                            Thực đơn
                        </Nav.Link>
                        <Nav.Link 
                            as={NavLink} 
                            to="/admin" 
                            className={({ isActive }) => isActive ? "fw-bold text-danger nav-link" : "nav-link"}
                        >
                            Quản lý
                        </Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center gap-2">
                        <Button 
                            as={NavLink} 
                            to="/cart" 
                            variant="outline-danger" 
                            className="position-relative me-2"
                        >
                            🛒 Giỏ hàng
                            {totalCartCount > 0 && (
                                <Badge 
                                    bg="danger" 
                                    pill 
                                    className="position-absolute top-0 start-100 translate-middle"
                                >
                                    {totalCartCount}
                                </Badge>
                            )}
                        </Button>
                        <Button 
                            variant={isLoggedIn ? "outline-secondary" : "danger"} 
                            size="sm" 
                            onClick={onToggleLogin}
                            className="me-2"
                        >
                            {isLoggedIn ? "Đăng xuất" : "Đăng nhập Admin"}
                        </Button>
                        <Button 
                            variant={theme === 'dark' ? 'warning' : 'dark'} 
                            size="sm" 
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? '☀️ Sáng' : '🌙 Tối'}
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
