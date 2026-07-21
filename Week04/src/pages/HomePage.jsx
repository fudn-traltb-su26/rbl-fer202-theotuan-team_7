import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';

const HomePage = ({ categories, dishes, onAddToCart }) => {
    return (
        <>
            <Banner />
            <SectionWrapper
                title="Danh Mục Món Ăn"
                subtitle="Chọn nhanh nhóm món phù hợp với bữa ăn hôm nay"
                backgroundColor="#f8f9fa"
            >
                <CategoryList categories={categories} />
            </SectionWrapper>
            <SectionWrapper
                title="Món Ăn Nổi Bật"
                subtitle="Những lựa chọn được khách hàng yêu thích nhất tuần này"
            >
                <DishGrid dishes={dishes} onAddToCart={onAddToCart} />
            </SectionWrapper>
        </>
    );
};

export default HomePage;
