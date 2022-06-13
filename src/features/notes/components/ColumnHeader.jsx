import { Input } from 'antd';
import React from 'react';

const ColumnHeader = ({ title, onDelete, onEdit, ...rest }) => {
    const [isInputOpen, setIsInputOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState();

    const toggleTitleEditor = () => {
        setInputValue(title);
        setIsInputOpen(true);
    };

    const handleSubmit = () => {
        setInputValue('');
        setIsInputOpen(false);
        if (inputValue.trim() !== title.trim()) onEdit(inputValue);
    };

    const onChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-text-left" {...rest}>
            {!isInputOpen ? (
                <div className="gx-d-flex">
                    <h2
                        style={{
                            wordBreak: 'break-all',
                        }}
                        onClick={toggleTitleEditor}
                    >
                        {title}
                    </h2>
                </div>
            ) : (
                <div>
                    <Input value={inputValue} onChange={onChange} onBlur={handleSubmit} />
                </div>
            )}
            <span className="gx-fs-xl" onClick={onDelete}>
                <i className="icon icon-trash gx-icon-btn" />
            </span>
        </div>
    );
};

export default ColumnHeader;
