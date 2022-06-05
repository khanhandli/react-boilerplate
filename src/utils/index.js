import { notification } from 'antd';

export const Notification = (status, msg) => {
    if (notification[status] !== 'error') {
        notification[status]({
            message: msg,
        });
    } else {
        notification[status]({
            message: msg.response.data.message,
        });
    }
};

export const Action = (type, payload) => {
    return {
        type,
        payload,
    };
};
