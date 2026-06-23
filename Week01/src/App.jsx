import React from 'react';

function App() {
  return (
    <div className="container mt-5 py-5 text-center">
      <div className="p-5 mb-4 bg-light rounded-3 border shadow-sm" style={{ borderLeft: '8px solid #ff5722' }}>
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold text-dark">
            <span style={{ color: '#ff5722' }}>🍔 TastyHub</span> Restaurant Manager
          </h1>
          <p className="col-md-8 fs-4 mx-auto text-muted mt-3">
            Chào mừng bạn đến với hệ thống quản lý nhà hàng TastyHub! Dự án đã được chuyển đổi thành công từ nhà sách sang quản lý ẩm thực bằng Vite + React 18.
          </p>
          <hr className="my-4" />
          <p className="fs-6 text-secondary">
            Cấu hình thư mục, cơ sở dữ liệu giả lập thực đơn (db.json) và tài liệu Handoff đã hoàn tất cho Tuần 1.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <span className="badge bg-danger px-3 py-2 fs-6">React 18</span>
            <span className="badge bg-secondary px-3 py-2 fs-6">Vite</span>
            <span className="badge bg-success px-3 py-2 fs-6">Bootstrap 5</span>
            <span className="badge bg-dark px-3 py-2 fs-6">React Router Dom v6</span>
            <span className="badge bg-warning text-dark px-3 py-2 fs-6">Axios</span>
            <span className="badge bg-info text-dark px-3 py-2 fs-6">JSON Server API</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
