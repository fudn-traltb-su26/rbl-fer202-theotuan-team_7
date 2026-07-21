import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import DishTable from '../components/DishTable';
import DishFormModal from '../components/DishFormModal';
import SectionWrapper from '../components/SectionWrapper';

const DishManagePage = ({ dishes, onAddDish, onUpdateDish, onDeleteDish }) => {
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
                    <Button variant="success" className="fw-semibold" onClick={handleAddClick}>
                        + Thêm món ăn mới
                    </Button>
                </Stack>
                <DishTable dishes={dishes} onEdit={handleEditClick} onDelete={onDeleteDish} />
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
