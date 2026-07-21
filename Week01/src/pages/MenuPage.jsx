import { useEffect, useRef, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SearchBar from '../components/SearchBar';
import SectionWrapper from '../components/SectionWrapper';

const MenuPage = ({
    categories,
    dishes,
    activeCategory,
    onSearch,
    onSelectCategory
}) => {
    const [visibleDishes, setVisibleDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibleDishes(dishes);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [dishes]);

    useEffect(() => {
        if (!loading) {
            searchRef.current?.focus();
        }
    }, [loading]);

    return (
        <>
            <SectionWrapper
                title="Thuc Don TastyHub"
                subtitle="Tim kiem va loc cac nhom mon an dang phuc vu"
                backgroundColor="#f8f9fa"
            >
                <SearchBar ref={searchRef} onSearch={onSearch} />
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
                {loading ? (
                    <Alert variant="light" className="text-center border">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Dang tai thuc don...
                    </Alert>
                ) : (
                    <DishGrid dishes={visibleDishes} />
                )}
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
