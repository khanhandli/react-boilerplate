import { Collapse, Card, Input, Divider, Button } from 'antd';
import React from 'react';
import InputCard from './InputCard';
const AddCard = ({ handleOnAddCard }) => {
    const [key, setKey] = React.useState('');
    const [title, setTitle] = React.useState('');

    const handleOnConfirm = () => {
        if (!title) return;
        setKey('');
        handleOnAddCard(title);
        setTitle('');
    };

    const toggleCollapse = () => {
        setKey((prev) => (prev === '1' ? '' : '1'));
    };

    return (
        <div>
            <Divider style={{ marginTop: 0 }} />
            <Collapse ghost activeKey={key}>
                <Collapse.Panel
                    showArrow={false}
                    header={
                        <div onClick={toggleCollapse} className="btn_add_card">
                            + Thêm thẻ
                        </div>
                    }
                    key="1"
                >
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
                    <div className="gx-text-right">
                        <Button
                            type="primary"
                            size="small"
                            onClick={handleOnConfirm}
                            className="gx-mb-0 gx-mt-2 gx-w-25"
                        >
                            Thêm
                        </Button>
                    </div>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

export default React.memo(AddCard);
