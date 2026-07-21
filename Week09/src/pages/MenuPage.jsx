import { useEffect, useRef, useState } from 'react';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';
import SearchBar from '../components/SearchBar';
import { Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { dishService } from '../services/dishService';

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
                    <Container className="text-center py-5">
                        <Spinner animation="border" variant="danger" />
                        <p className="mt-2 text-muted">Đang tải danh sách món ăn từ máy chủ...</p>
                    </Container>
                ) : error ? (
                    <Container className="py-3">
                        <Alert variant="danger" className="text-center">{error}</Alert>
                    </Container>
                ) : (
                    <DishGrid dishes={filteredDishes} />
                )}
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
