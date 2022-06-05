import React from 'react';
import { SettingActions } from '@/app-redux/settings';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import CircularProgress from '@/components/CircularProgress';
import { AuthActions } from '@/app-redux/auth';
import { Notification } from '@/utils';
import { postDataAPI } from '@/apis';

const NoHeaderNotification = () => {
    const { auth, settings } = useSelector((state) => state);
    const { user, token } = auth;
    const { navCollapsed } = settings;

    const dispatch = useDispatch();

    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [verify, setVerify] = React.useState(false);
    const [tokenVerify, setTokenVerify] = React.useState('');

    const handleSendEmail = async () => {
        try {
            setLoading(true);
            const res = await postDataAPI(`v1/auth/send-verification-email`, {}, token);
            if (res.status === 200) {
                Notification('success', res.data.msg);
                setVerify(true);
                setLoading(false);
            }
        } catch (error) {
            Notification('error', error);
            setLoading(false);
        }
    };

    const handleVerifyEmail = async () => {
        if (!tokenVerify) return Notification('error', 'Bạn chưa nhập mã!');
        try {
            setLoading(true);
            const res = await postDataAPI(`v1/auth/verify-email?token=` + tokenVerify, {}, token);
            if (res.status === 200) {
                dispatch(dispatch({ type: 'verify_email', payload: true }));
                Notification('success', res.data.msg);
                setVisible(false);
                setLoading(false);
            }
        } catch (error) {
            Notification('error', error);
            setLoading(false);
        }
    };

    return (
        <div className="gx-no-header-horizontal">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
                <i
                    className="gx-icon-btn icon icon-menu"
                    onClick={() => {
                        dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
                    }}
                />
            </div>
            <div className="gx-no-header-horizontal-top">
                <div className="gx-no-header-horizontal-top-center gx-d-flex gx-align-items-center">
                    <i className="icon icon-alert gx-mr-3" />
                    <div className="gx-mb-0 gx-text-truncate gx-d-flex gx-align-items-center">
                        <div>Tài khoản của bạn chưa xác thực!</div>
                        <Button className="gx-mb-0" type="link">
                            <span className="gx-text-underline" onClick={() => setVisible(true)}>
                                Xác thực ngay
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal centered title="Xác thực tài khoản" visible={visible} footer={null}>
                {!loading ? (
                    !verify ? (
                        <div>
                            <Input className="gx-mb-4" disabled defaultValue={user.email} />
                            <div className="gx-d-flex gx-justify-content-end">
                                <Button onClick={handleSendEmail} type="primary">
                                    Gửi Email
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Input.TextArea
                                placeholder="Dán mã xác thực tại đây ..."
                                rows="4"
                                className="gx-mb-4"
                                onChange={(e) => setTokenVerify(e.target.value)}
                                value={tokenVerify}
                            />
                            <div className="gx-d-flex gx-justify-content-end">
                                <Button onClick={handleVerifyEmail} type="primary">
                                    Xác thực
                                </Button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="gx-loader-view">
                        <CircularProgress />
                        <p></p>
                        Đang xác thực ...
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default NoHeaderNotification;
