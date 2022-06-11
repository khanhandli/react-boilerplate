import { Collapse, Card } from 'antd';
import React from 'react';
import InputCard from './InputCard';
const AddCard = ({ handleOnAddCard }) => {
    const [open, setOpen] = React.useState(false);

    const handleOnConfirm = (title) => {
        handleOnAddCard(title);
    };
    return (
        <div
            style={{
                width: '100%',
                marginTop: '20px',
            }}
        >
            <Collapse accordion={open}>
                <InputCard
                    content={'Add Card'}
                    setOpen={setOpen}
                    onConfirm={handleOnConfirm}
                    placeholder={'Add Title'}
                    multiline
                    rows={3}
                />
            </Collapse>
            <Collapse accordion={!open}>
                <Card
                    style={{
                        padding: '10px 10px 10px 20px',
                        background: '#EBECF0',
                        cursor: 'pointer',
                    }}
                    onClick={() => setOpen(!open)}
                >
                    <h1>+ Add a Card</h1>
                </Card>
            </Collapse>
        </div>
    );
};

export default AddCard;
