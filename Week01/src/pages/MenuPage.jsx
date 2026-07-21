import { useRef, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import CategoryList from '../components/CategoryList';
import DishGrid from '../components/DishGrid';
import SearchBar from '../components/SearchBar';
import SectionWrapper from '../components/SectionWrapper';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';

const MenuPage = ({ categories }) => {
    const [keyword, setKeyword] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const debouncedKeyword = useDebounce(keyword, 400);
    const searchRef = useRef(null);
    const {
        data: dishes,
        loading,
        error,
        refetch
    } = useFetch('/dishes', {
        q: debouncedKeyword,
        categoryId: activeCategory
    });

    const handleSelectCategory = (categoryId) => {
        setActiveCategory((currentCategory) =>
            currentCategory === categoryId ? null : categoryId
        );
    };

    return (
        <>
            <SectionWrapper
                title="Thuc Don TastyHub"
                subtitle="Tim kiem duoc debounce 400ms va loc danh muc qua API params"
                backgroundColor="#f8f9fa"
            >
                <SearchBar ref={searchRef} onSearch={setKeyword} />
                <CategoryList
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={handleSelectCategory}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Tat Ca Mon An"
                subtitle="MenuPage dung useFetch + useDebounce thay cho useEffect + axios truc tiep"
            >
                {loading && (
                    <Alert variant="light" className="text-center border">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Dang tai thuc don...
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" className="text-center">
                        <p className="mb-3">Khong tai duoc thuc don: {error}</p>
                        <Button variant="outline-danger" onClick={refetch}>
                            Thu lai
                        </Button>
                    </Alert>
                )}

                {!loading && !error && <DishGrid dishes={dishes} />}
            </SectionWrapper>
        </>
    );
};

export default MenuPage;
