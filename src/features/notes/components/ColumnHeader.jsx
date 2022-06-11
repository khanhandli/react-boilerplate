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
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
            }}
            {...rest}
        >
            {!isInputOpen ? (
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                    }}
                >
                    <h1
                        style={{
                            wordBreak: 'break-all',
                        }}
                        onClick={toggleTitleEditor}
                    >
                        {title}
                    </h1>
                </div>
            ) : (
                <div onClick={handleSubmit}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={{
                                background: 'white',
                                maxHeight: '100%',
                                boxSizing: 'border-box',
                                paddingLeft: '20px',
                                borderRadius: '10px',
                            }}
                            value={inputValue}
                            onChange={onChange}
                        />
                    </form>
                </div>
            )}
            Xóa
            {/* <IconButton size="small" onClick={onDelete}>
                <DeleteIcon fontSize="small" />
            </IconButton> */}
        </div>
    );
};

export default ColumnHeader;
