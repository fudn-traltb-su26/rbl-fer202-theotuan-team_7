import { Alert, Col, Row } from 'react-bootstrap';
import DishCard from './DishCard';

const DishGrid = ({ dishes = [], onAddToCart = () => {} }) => {
    if (dishes.length === 0) {
        return <Alert variant="info" className="text-center mb-0">Không có món ăn nào.</Alert>;
    }

    return (
        <Row className="g-4">
            {dishes.map((dish) => (
                <Col key={dish.id} sm={6} lg={3}>
                    <DishCard dish={dish} onAddToCart={onAddToCart} />
                </Col>
            ))}
        </Row>
    );
};

export default DishGrid;
