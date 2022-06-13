import React from 'react';
import { Card as CardAntd, Image } from 'antd';
import EditCard from './EditCard';
import { Draggable } from 'react-beautiful-dnd';
const Card = ({ card, index, onDelete, onSave }) => {
    const [open, setOpen] = React.useState(false);

    const handleOnDelete = () => onDelete(card.id);

    const handleOpenEdit = (e) => {
        setOpen(true);
    };

    const handleOnSave = (newCard) => {
        onSave(newCard);
    };

    return (
        <>
            <Draggable draggableId={card.id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <CardAntd
                            size="small"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="gx-h-auto gx-mb-3 gx-text-left gx-p-1 card-item"
                            style={{
                                borderRadius: '6px',
                                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px',
                                ...provided.draggableProps.style,
                            }}
                        >
                            {/* <Image src={card.img} style={{ height: 'auto', maxHeight: 50 }} title="" alt="" /> */}
                            <div className="gx-d-flex gx-p-0 gx-m-0">
                                <div style={{ flex: 1, wordBreak: 'break-all', whiteSpace: 'normal' }}>
                                    {card.title}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '14px',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <span
                                            className="gx-fs-md gx-pointer btn_card_edit gx-d-none"
                                            onClick={handleOpenEdit}
                                        >
                                            <i className="icon icon-edit " />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardAntd>
                    );
                }}
            </Draggable>
            {
                <EditCard
                    handleOnDelete={handleOnDelete}
                    open={open}
                    setOpen={setOpen}
                    card={card}
                    onSave={handleOnSave}
                />
            }
        </>
    );
};

export default Card;
