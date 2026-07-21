import { forwardRef, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = forwardRef(({ onSearch = () => {} }, ref) => {
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();

        if (trimmed !== '' && trimmed.length < 2) {
            setError('Tu khoa tim kiem phai co it nhat 2 ky tu.');
            return;
        }

        setError('');
        onSearch(trimmed);
    };

    const handleClear = () => {
        setKeyword('');
        setError('');
        onSearch('');
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="position-relative">
                <InputGroup hasValidation>
                    <Form.Control
                        ref={ref}
                        type="text"
                        placeholder="Tim mon an ngon..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        isInvalid={!!error}
                    />
                    {keyword && (
                        <Button variant="outline-secondary" onClick={handleClear}>
                            x
                        </Button>
                    )}
                    <Button variant="danger" type="submit">
                        Tim kiem
                    </Button>
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </Form>
    );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
