import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập với quyền Admin để truy cập khu vực này!');
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
