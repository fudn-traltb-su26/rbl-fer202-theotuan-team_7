import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SectionWrapper from '../components/SectionWrapper';

const HomePage = ({ categories, dishes }) => {
    return (
        <>
            <Banner />
            <SectionWrapper
                title="Danh Muc Mon An"
                subtitle="Chon nhanh nhom mon phu hop voi bua an hom nay"
                backgroundColor="#f8f9fa"
            >
                <CategoryList
                    categories={categories}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Mon An Noi Bat"
                subtitle="Nhung lua chon duoc khach hang yeu thich nhat tuan nay"
            >
                <DishGrid dishes={dishes} />
            </SectionWrapper>
        </>
    );
};

export default HomePage;
