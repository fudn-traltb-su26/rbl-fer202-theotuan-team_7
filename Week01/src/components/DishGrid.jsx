import { Alert, Col, Row } from 'react-bootstrap';
import DishCard from './DishCard';

const DishGrid = ({ dishes = [] }) => {
    if (dishes.length === 0) {
        return <Alert variant="info" className="text-center mb-0">Khong co mon an nao.</Alert>;
    }

    return (
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
            {dishes.map((dish) => (
                <Col key={dish.id} className="d-flex">
                    <DishCard dish={dish} />
                </Col>
            ))}
        </Row>
    );
};

export default DishGrid;
