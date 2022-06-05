import { Avatar, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '@/app-redux/auth';
import PropTypes from 'prop-types';

function UserProfile({ name, image = 'https://via.placeholder.com/150x150' }) {
    const dispatch = useDispatch();

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li>My Account</li>
            <li onClick={() => dispatch(AuthActions.logout())}>Logout</li>
        </ul>
    );

    return (
        <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar src={image} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                <span className="gx-avatar-name">
                    {name}
                    <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
                </span>
            </Popover>
        </div>
    );
}

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default UserProfile;
