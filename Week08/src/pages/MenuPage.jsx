import { useEffect, useRef } from 'react';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';
import SearchBar from '../components/SearchBar';
import { Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const MenuPage = ({ 
    categories, 
    dishes, 
    loading,
    error,
    onSearch, 
    activeCategory, 
    onSelectCategory 
}) => {
    const searchInputRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

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
                subtitle="Dữ liệu được lọc động dựa trên từ khóa tìm kiếm và danh mục lựa chọn"
            >
                <div className="mx-auto mb-4" style={{ maxWidth: '600px' }}>
                    <SearchBar onSearch={onSearch} inputRef={searchInputRef} />
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
                    <DishGrid dishes={dishes} />
                )}
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
