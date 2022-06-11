import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

const PopcomfirmComponent = ({ children, title, onComfirm, onCancel, okText = 'Đồng ý', cancelText = 'Hủy' }) => {
    return (
        <Popconfirm title={title} onConfirm={onComfirm} onCancel={onCancel} okText={okText} cancelText={cancelText}>
            {children}
        </Popconfirm>
    );
};

PopcomfirmComponent.prooTypes = {
    title: PropTypes.string,
    onComfirm: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.node,
};

export default PopcomfirmComponent;
