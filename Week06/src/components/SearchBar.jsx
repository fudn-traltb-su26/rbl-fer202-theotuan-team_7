import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed !== '' && trimmed.length < 2) {
            setError('Từ khóa tìm kiếm phải chứa ít nhất 2 ký tự.');
        } else {
            setError('');
            onSearch(trimmed);
        }
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
                        type="text"
                        placeholder="Tìm món ăn ngon..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        isInvalid={!!error}
                    />
                    {keyword && (
                        <Button 
                            variant="outline-secondary" 
                            onClick={handleClear} 
                            style={{ zIndex: 5 }}
                        >
                            ✕
                        </Button>
                    )}
                    <Button variant="danger" type="submit">
                        Tìm kiếm
                    </Button>
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default SearchBar;
