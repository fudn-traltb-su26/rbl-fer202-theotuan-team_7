import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import DishCard from './DishCard';
import { fetchDishes } from '../services/dishService';

const DishGrid = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadDishes = async () => {
            try {
                const data = await fetchDishes();
                setDishes(data);
            } catch {
                setErrorMessage('Không thể tải dữ liệu món ăn từ API.');
            } finally {
                setLoading(false);
            }
        };

        loadDishes();
    }, []);

    return (
        <section className="py-5">
            <Container>
                <h2 className="fw-bold text-center mb-4">Món Ăn Nổi Bật</h2>

                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}

                {loading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" variant="danger" />
                    </div>
                ) : (
                    <Row className="g-4">
                        {dishes.map((dish) => (
                            <Col key={dish.id} sm={6} lg={3}>
                                <DishCard dish={dish} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    );
};

export default DishGrid;
