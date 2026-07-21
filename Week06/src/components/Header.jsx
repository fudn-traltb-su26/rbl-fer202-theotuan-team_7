import { Badge, Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = ({ cartCount = 0, isLoggedIn, onToggleLogin }) => {
    return (
        <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
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
                    <div className="d-flex align-items-center gap-3">
                        <Button 
                            as={NavLink} 
                            to="/cart" 
                            variant="outline-danger" 
                            className="position-relative me-2"
                        >
                            🛒 Giỏ hàng
                            {cartCount > 0 && (
                                <Badge 
                                    bg="danger" 
                                    pill 
                                    className="position-absolute top-0 start-100 translate-middle"
                                >
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>
                        <Button 
                            variant={isLoggedIn ? "outline-secondary" : "danger"} 
                            size="sm" 
                            onClick={onToggleLogin}
                        >
                            {isLoggedIn ? "Đăng xuất Admin" : "Đăng nhập Admin"}
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
