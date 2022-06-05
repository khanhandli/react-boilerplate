import React from 'react';
import { Avatar, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '@/app-redux/auth';
import PropTypes from 'prop-types';

import AppLink from '@/components/AppLink';

function UserInfo({ image = 'https://via.placeholder.com/150' }) {
    const dispatch = useDispatch();

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li>
                <AppLink href="/my-account">My Account</AppLink>
            </li>
            <li onClick={() => dispatch(AuthActions.logout)}>Logout 2</li>
        </ul>
    );

    return (
        <div className="gx-user-nav">
            <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={userMenuOptions}
                trigger="click"
            >
                <Avatar src={image} className="gx-avatar gx-pointer" alt="" />
            </Popover>
        </div>
    );
}

UserInfo.propTypes = {
    image: PropTypes.string,
};

export default UserInfo;
