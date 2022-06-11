import { notification } from 'antd';

export const Notification = (status, msg) => {
    if (status !== 'error') {
        notification[status]({
            message: msg,
        });
    } else {
        notification[status]({
            message: msg.response.data.message,
        });
    }
};

export const htmlDecode = (content) => {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export const Action = (type, payload) => {
    return {
        type,
        payload,
    };
};
