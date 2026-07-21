import { Container } from 'react-bootstrap';

const SectionWrapper = ({
    title,
    subtitle = '',
    backgroundColor = '#fff',
    children
}) => {
    return (
        <section className="py-5" style={{ backgroundColor }}>
            <Container>
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-2">{title}</h2>
                    {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
                </div>
                {children}
            </Container>
        </section>
    );
};

export default SectionWrapper;
