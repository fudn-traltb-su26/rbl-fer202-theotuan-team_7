import { Alert, Button, ButtonGroup, Container, Image, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartPage = ({
    cartItems = [],
    onUpdateQuantity = () => {},
    onRemove = () => {}
}) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <Container className="py-5">
                <Alert variant="info" className="text-center">
                    <h1 className="h3 fw-bold">Gio hang trong</h1>
                    <p className="mb-3">Hay chon mon trong thuc don de bat dau dat hang.</p>
                    <Button as={Link} to="/menu" variant="danger">
                        Xem thuc don
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="fw-bold mb-4">Gio hang</h1>
            <Table responsive bordered hover className="align-middle bg-white">
                <thead className="table-dark">
                    <tr>
                        <th>Hinh anh</th>
                        <th>Ten mon</th>
                        <th>Don gia</th>
                        <th>So luong</th>
                        <th>Thanh tien</th>
                        <th>Xoa</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Image src={item.image} alt={item.name} className="cart-thumb" rounded />
                            </td>
                            <td className="fw-semibold">{item.name}</td>
                            <td>{item.price.toLocaleString('vi-VN')}d</td>
                            <td>
                                <ButtonGroup size="sm">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </Button>
                                    <Button variant="light" disabled>{item.quantity}</Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </td>
                            <td className="fw-bold text-danger">
                                {(item.price * item.quantity).toLocaleString('vi-VN')}d
                            </td>
                            <td>
                                <Button variant="outline-danger" size="sm" onClick={() => onRemove(item.id)}>
                                    Xoa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-end fs-4 fw-bold">
                Tong tien: <span className="text-danger">{totalPrice.toLocaleString('vi-VN')}d</span>
            </div>
        </Container>
    );
};

export default CartPage;
