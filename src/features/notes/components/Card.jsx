import React from 'react';
import { Card as CardAntd, Image } from 'antd';
import EditCard from './EditCard';
import { Draggable } from 'react-beautiful-dnd';
const Card = ({ card, index, onDelete, onSave }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOnDelete = () => onDelete(card.id);

    const handleOpenEdit = (e) => setAnchorEl(e.currentTarget);

    const handleCloseEdit = () => setAnchorEl(null);

    const handleOnSave = (newCard) => {
        setAnchorEl(null);
        onSave(newCard);
    };

    return (
        <>
            <Draggable draggableId={card.id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <CardAntd
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                height: 'auto',
                                background: 'ivory',
                                textAlign: 'left',
                                marginBottom: '20px',
                                ...provided.draggableProps.style,
                            }}
                        >
                            <Image src={card.img} style={{ height: 'auto', maxHeight: 50 }} title="" alt="" />
                            <CardAntd
                                style={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    padding: '20px',
                                }}
                            >
                                <h1 style={{ flex: 1, wordBreak: 'break-all', whiteSpace: 'normal' }}>{card.title}</h1>
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '20px',
                                        }}
                                    >
                                        <div>Sửa</div>
                                        <div>Xóa</div>
                                        {/* <IconButton size="small" onClick={handleOpenEdit}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={handleOnDelete}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton> */}
                                    </div>
                                </div>
                            </CardAntd>
                        </CardAntd>
                    );
                }}
            </Draggable>
            {anchorEl && <EditCard anchorEl={anchorEl} onClose={handleCloseEdit} card={card} onSave={handleOnSave} />}
        </>
    );
};

export default Card;
