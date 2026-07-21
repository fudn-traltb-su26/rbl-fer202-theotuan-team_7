import { useEffect, useRef, useState } from 'react';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';
import SearchBar from '../components/SearchBar';
import { Button, Spinner, Alert, Container, Placeholder, Card, Row, Col } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { dishService } from '../services/dishService';

const SkeletonGrid = () => {
    return (
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
            {[1, 2, 3, 4, 5].map((idx) => (
                <Col key={idx} className="h-100">
                    <Card className="h-100 border-0 shadow-sm">
                        <div style={{ height: '180px', backgroundColor: '#e9ecef' }}></div>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={5} /> <Placeholder xs={4} />
                            </Placeholder>
                            <Placeholder.Button variant="danger" className="w-100 mt-2" />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

const MenuPage = ({ categories, activeCategory, onSelectCategory }) => {
    const searchInputRef = useRef(null);
    const { theme } = useTheme();
    
    // Fetch dishes list using custom hook
    const { data: dishes, loading, error } = useFetch(dishService.getDishes);
    
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 400);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Filter dishes based on active category and debounced keyword
    const filteredDishes = dishes.filter((dish) => {
        const matchesKeyword = !debouncedKeyword || 
            dish.name.toLowerCase().includes(debouncedKeyword.toLowerCase()) || 
            dish.chef.toLowerCase().includes(debouncedKeyword.toLowerCase());
        const matchesCategory = activeCategory === null || dish.category === activeCategory;
        return matchesKeyword && matchesCategory;
    });

    return (
        <>
            <SectionWrapper
                title="Thực Đơn TastyHub"
                subtitle="Khám phá đầy đủ các nhóm món ăn đang phục vụ"
                backgroundColor={theme === 'dark' ? '#343a40' : '#f8f9fa'}
            >
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <Button 
                        variant={activeCategory === null ? "danger" : "outline-danger"} 
                        onClick={() => onSelectCategory(null)}
                    >
                        Tất cả
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={activeCategory === cat.name ? "danger" : "outline-danger"}
                            onClick={() => onSelectCategory(cat.name)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
                <CategoryList categories={categories} />
            </SectionWrapper>
            <SectionWrapper
                title="Tất Cả Món Ăn"
                subtitle="Dữ liệu được lọc động dựa trên từ khóa tìm kiếm (đã được tối ưu debounce) và danh mục"
            >
                <div className="mx-auto mb-4" style={{ maxWidth: '600px' }}>
                    <SearchBar onSearch={setKeyword} inputRef={searchInputRef} />
                </div>
                
                {loading ? (
                    <SkeletonGrid />
                ) : error ? (
                    <Container className="py-3">
                        <Alert variant="danger" className="text-center">{error}</Alert>
                    </Container>
                ) : filteredDishes.length === 0 ? (
                    <Container className="text-center py-5">
                        <Alert variant="warning" className="d-inline-block px-5">
                            🔍 Rất tiếc, không tìm thấy món ăn nào phù hợp với từ khóa của bạn.
                        </Alert>
                    </Container>
                ) : (
                    <DishGrid dishes={filteredDishes} />
                )}
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
