import { useState } from 'react';
import { Container, Button, Stack, Spinner, Alert } from 'react-bootstrap';
import DishTable from '../components/DishTable';
import DishFormModal from '../components/DishFormModal';
import SectionWrapper from '../components/SectionWrapper';

const DishManagePage = ({ dishes, loading, error, onAddDish, onUpdateDish, onDeleteDish }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);

    const handleAddClick = () => {
        setSelectedDish(null);
        setShowModal(true);
    };

    const handleEditClick = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const handleSave = (dishData) => {
        if (selectedDish) {
            onUpdateDish(dishData);
        } else {
            onAddDish(dishData);
        }
    };

    return (
        <SectionWrapper 
            title="Quản Lý Thực Đơn" 
            subtitle="Khu vực dành cho Quản trị viên (Admin) quản lý các món ăn trong hệ thống"
        >
            <Container>
                <Stack direction="horizontal" className="justify-content-end mb-4">
                    <Button variant="success" className="fw-semibold" onClick={handleAddClick} disabled={loading}>
                        + Thêm món ăn mới
                    </Button>
                </Stack>
                
                {loading ? (
                    <Container className="text-center py-5">
                        <Spinner animation="border" variant="danger" />
                        <p className="mt-2 text-muted">Đang cập nhật thực đơn từ máy chủ...</p>
                    </Container>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
                ) : (
                    <DishTable dishes={dishes} onEdit={handleEditClick} onDelete={onDeleteDish} />
                )}
                
                <DishFormModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    onSave={handleSave}
                    dish={selectedDish}
                />
            </Container>
        </SectionWrapper>
    );
};

export default DishManagePage;
