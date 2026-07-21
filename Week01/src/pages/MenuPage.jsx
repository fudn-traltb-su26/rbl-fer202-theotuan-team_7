import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';
import SearchBar from '../components/SearchBar';
import { Button } from 'react-bootstrap';

const MenuPage = ({ 
    categories, 
    dishes, 
    onAddToCart, 
    onSearch, 
    activeCategory, 
    onSelectCategory 
}) => {
    return (
        <>
            <SectionWrapper
                title="Thực Đơn TastyHub"
                subtitle="Khám phá đầy đủ các nhóm món ăn đang phục vụ"
                backgroundColor="#f8f9fa"
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
                    <SearchBar onSearch={onSearch} />
                </div>
                <DishGrid dishes={dishes} onAddToCart={onAddToCart} />
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
