import { Container, Table, Button, Stack, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';

const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
    const navigate = useNavigate();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <SectionWrapper title="Giỏ Hàng Của Bạn" subtitle="Giỏ hàng hiện đang trống">
                <Container className="text-center py-5">
                    <Alert variant="info" className="mb-4">Không có món ăn nào trong giỏ hàng.</Alert>
                    <Button variant="danger" size="lg" onClick={() => navigate('/menu')}>
                        Xem thực đơn đặt món
                    </Button>
                </Container>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper title="Giỏ Hàng Của Bạn" subtitle="Kiểm tra lại thực đơn đã chọn của bạn trước khi thanh toán">
            <Container>
                <Table responsive striped bordered hover className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên món</th>
                            <th>Giá bán</th>
                            <th>Số lượng</th>
                            <th>Tổng cộng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                                    />
                                </td>
                                <td className="fw-bold">{item.name}</td>
                                <td>{item.price.toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <Stack direction="horizontal" gap={2} className="align-items-center">
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="fw-bold px-2">{item.quantity}</span>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </Stack>
                                </td>
                                <td className="text-danger fw-semibold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => onRemoveFromCart(item.id)}>
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <Stack direction="horizontal" className="justify-content-between mt-4">
                    <Button variant="outline-danger" onClick={onClearCart}>
                        Xoá toàn bộ giỏ hàng
                    </Button>
                    <div className="text-end">
                        <h4>Tổng tiền: <span className="text-danger fw-bold">{totalPrice.toLocaleString('vi-VN')}đ</span></h4>
                        <Button 
                            variant="success" 
                            size="lg" 
                            className="mt-2 fw-semibold px-4" 
                            onClick={() => alert('Đặt đơn hàng thành công! TastyHub sẽ liên hệ xác nhận.')}
                        >
                            Tiến hành đặt món
                        </Button>
                    </div>
                </Stack>
            </Container>
        </SectionWrapper>
    );
};

export default CartPage;
