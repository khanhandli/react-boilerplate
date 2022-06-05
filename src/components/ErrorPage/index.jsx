import React from 'react';
import AppLink from '@/components/AppLink';

function ErrorPage() {
    return (
        <div style={{ height: '100vh' }} className="gx-page-error-container">
            <div className="gx-page-error-content">
                <div className="gx-error-code gx-mb-4">404</div>
                <h2 className="gx-text-center">Rất tiếc, đã xảy ra lỗi. Không tìm thấy trang!</h2>
                <p className="gx-text-center">
                    <AppLink className="gx-btn gx-btn-primary" href="/">
                        Trở lại
                    </AppLink>
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;
