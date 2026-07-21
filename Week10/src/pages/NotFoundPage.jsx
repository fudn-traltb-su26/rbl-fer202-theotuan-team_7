import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper 
            title="404 - Không Tìm Thấy Trang" 
            subtitle="Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi"
        >
            <Container className="text-center py-5">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <p className="lead text-muted mb-4">Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ.</p>
                <Button variant="danger" size="lg" onClick={() => navigate('/')}>
                    Quay về Trang Chủ
                </Button>
            </Container>
        </SectionWrapper>
    );
};

export default NotFoundPage;
