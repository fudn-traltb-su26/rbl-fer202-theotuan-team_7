import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';

const MenuPage = ({ categories, dishes, onAddToCart }) => {
    return (
        <>
            <SectionWrapper
                title="Thực Đơn TastyHub"
                subtitle="Khám phá đầy đủ các nhóm món ăn đang phục vụ"
                backgroundColor="#f8f9fa"
            >
                <CategoryList categories={categories} />
            </SectionWrapper>
            <SectionWrapper
                title="Tất Cả Món Ăn"
                subtitle="Dữ liệu được truyền từ App xuống DishGrid rồi xuống từng DishCard qua props"
            >
                <DishGrid dishes={dishes} onAddToCart={onAddToCart} />
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
