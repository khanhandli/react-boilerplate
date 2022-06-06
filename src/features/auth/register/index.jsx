import { Button, Checkbox, Form, Input } from 'antd';
import { AuthActions } from '@/app-redux/auth';
import CircularProgress from '@/components/CircularProgress';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLink from '@/components/AppLink';
import config from '@/config';
import wLogo from '@/assets/images/w-logo.png';
import Logo from '@/assets/images/logo.png';
import SocialLogin from '../socialLogin';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state?.auth);
    const { loading } = auth;
    const handleSubmit = async (value) => {
        dispatch(AuthActions.register(value));
    };

    return (
        <div className="gx-app-login-wrap">
            <div className="gx-app-login-container">
                <div className="gx-app-login-main-content">
                    <div className="gx-app-logo-content">
                        <div className="gx-app-logo-content-bg">
                            <img src="https://wieldy.g-axon.work/assets/images/appModule/neature.jpg" alt="Neature" />
                        </div>
                        <div className="gx-app-logo-wid">
                            Đăng ký
                            <p>
                                Bằng cách Đăng ký, bạn có thể tận dụng các tính năng đầy đủ của các dịch vụ của chúng
                                tôi.
                            </p>
                            <p>Nhận 1 tài khoản !!!</p>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="example" src={Logo} />
                        </div>
                    </div>

                    <div className="gx-app-login-content">
                        <Form onFinish={handleSubmit} className="gx-signup-form gx-form-row0">
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        type: 'string',
                                        message: 'Vui lòng nhập họ tên',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Vui lòng nhập đúng địa chỉ E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                <Input.Password type="password" placeholder="Nhập mật khẩu" />
                            </Form.Item>
                            <Form.Item initialValue={true}>
                                <Checkbox checked>Bằng cách đăng ký, tôi chấp nhận</Checkbox>
                                <span className="gx-signup-form-forgot gx-link">Kì hạn và điều kiện</span>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="gx-mb-0">
                                    Đăng ký
                                </Button>
                                <span>hoặc </span>
                                <AppLink href={config.routes.login}>Đăng nhập</AppLink>
                            </Form.Item>
                            <div className="gx-flex-row gx-justify-content-between">
                                <span>hoặc đăng nhập bằng</span>
                                <SocialLogin />
                            </div>
                        </Form>
                    </div>
                    {loading && (
                        <div className="gx-loader-view">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
