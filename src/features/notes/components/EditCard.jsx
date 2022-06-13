import { Input, Modal } from 'antd';
import React from 'react';

const EditCard = ({ open, setOpen, card, onSave, handleOnDelete }) => {
    const [title, setTitle] = React.useState(card.title);

    const handleSave = () => {
        if (title === card.title) return;
        onSave({ ...card, title });
        setOpen(false);
    };

    return (
        <Modal
            title="Sửa thẻ"
            onCancel={() => setOpen(!open)}
            centered
            visible={open}
            onOk={handleSave}
            okText="Đồng ý"
        >
            <div className="gx-d-flex gx-justify-content-end gx-mb-1">
                <span
                    className="gx-fs-md gx-pointer btn_card_delete"
                    onClick={() => {
                        setOpen(false);
                        handleOnDelete();
                    }}
                >
                    <i className="icon icon-trash gx-icon-btn" />
                </span>
            </div>
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                }}
            >
                <Input.TextArea
                    className="gx-border-0 ant-input gx-chat-textarea"
                    id="required"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    rows={2}
                    placeholder="Nhập tiêu đề thẻ"
                />
            </div>
        </Modal>
    );
};

export default EditCard;
