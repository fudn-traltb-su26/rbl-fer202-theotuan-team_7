import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Container, Spinner, Stack } from 'react-bootstrap';
import DishTable from '../components/DishTable';
import DishFormModal from '../components/DishFormModal';
import SectionWrapper from '../components/SectionWrapper';
import {
    createDish,
    deleteDish,
    getDishes,
    updateDish
} from '../services/dishService';

const DishManagePage = () => {
    const [dishes, setDishes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const loadDishes = useCallback(async () => {
        try {
            const data = await getDishes();
            setDishes(data);
            setError('');
        } catch (err) {
            setError('Khong tai duoc du lieu mon an. Kiem tra json-server port 3001.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(loadDishes, 0);
        return () => clearTimeout(timer);
    }, [loadDishes]);

    const handleAddClick = () => {
        setSelectedDish(null);
        setShowModal(true);
    };

    const handleEditClick = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const handleSave = async (dishData) => {
        try {
            if (selectedDish) {
                const updated = await updateDish(selectedDish.id, dishData);
                setDishes((prevDishes) =>
                    prevDishes.map((dish) => dish.id === selectedDish.id ? updated : dish)
                );
                setSuccess('Cap nhat mon an thanh cong.');
            } else {
                const created = await createDish(dishData);
                setDishes((prevDishes) => [...prevDishes, created]);
                setSuccess('Them mon an thanh cong.');
            }

            setError('');
            setShowModal(false);
        } catch (err) {
            setError('Luu mon an that bai. Hay thu lai.');
            console.error(err);
        }
    };

    const handleDelete = async (dishId) => {
        const confirmed = window.confirm('Ban chac chan muon xoa mon an nay?');
        if (!confirmed) return;

        try {
            await deleteDish(dishId);
            setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== dishId));
            setSuccess('Xoa mon an thanh cong.');
            setError('');
        } catch (err) {
            setError('Xoa mon an that bai. Hay thu lai.');
            console.error(err);
        }
    };

    return (
        <SectionWrapper
            title="Quan Ly Thuc Don"
            subtitle="Khu vuc admin goi API json-server de them, sua va xoa mon an"
        >
            <Container>
                <Stack direction="horizontal" className="justify-content-between mb-4" gap={3}>
                    <div>
                        {success && <Alert variant="success" className="mb-0 py-2">{success}</Alert>}
                    </div>
                    <Button variant="success" className="fw-semibold" onClick={handleAddClick}>
                        + Them mon an moi
                    </Button>
                </Stack>

                {error && (
                    <Alert variant="danger">
                        <p className="mb-2">{error}</p>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                                setLoading(true);
                                loadDishes();
                            }}
                        >
                            Thu lai
                        </Button>
                    </Alert>
                )}

                {loading ? (
                    <Alert variant="light" className="text-center border">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Dang tai bang mon an...
                    </Alert>
                ) : (
                    <DishTable dishes={dishes} onEdit={handleEditClick} onDelete={handleDelete} />
                )}

                <DishFormModal
                    key={`${showModal ? 'open' : 'closed'}-${selectedDish?.id ?? 'new'}`}
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
