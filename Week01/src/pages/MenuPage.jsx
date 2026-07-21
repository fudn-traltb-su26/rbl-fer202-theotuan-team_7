import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SearchBar from '../components/SearchBar';
import SectionWrapper from '../components/SectionWrapper';

const MenuPage = ({
    categories,
    dishes,
    activeCategory,
    onSearch,
    onSelectCategory,
    onAddToCart
}) => {
    return (
        <>
            <SectionWrapper
                title="Thuc Don TastyHub"
                subtitle="Tim kiem va loc cac nhom mon an dang phuc vu"
                backgroundColor="#f8f9fa"
            >
                <SearchBar onSearch={onSearch} />
                <CategoryList
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={onSelectCategory}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Tat Ca Mon An"
                subtitle="Danh sach duoc tinh tu keyword va danh muc dang chon trong App.jsx"
            >
                <DishGrid dishes={dishes} onAddToCart={onAddToCart} />
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
