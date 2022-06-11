import { Card as CardAntd } from 'antd';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Card from './Card';
import ColumnHeader from './ColumnHeader';
import AddCard from './AddCard';
import { NotesActions } from '@/app-redux/notes';

const Column = ({ id: columnId, cards, index, title, handleOnDeleteColumn, handleOnEditColumn }) => {
    const dispatch = useDispatch();

    const handleOnAddCard = (columnId) => (title) => dispatch(NotesActions.addCard({ title, columnId }));

    const handleOnDeleteCard = (columnId) => (cardId) => dispatch(NotesActions.deleteCard({ columnId, cardId }));

    const handleOnEditCard = (columnId) => (newCard) => dispatch(NotesActions.editCard({ columnId, newCard }));

    return (
        <Draggable draggableId={columnId} index={index}>
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        style={{
                            backgroundColor: '#e3e3e3',
                            position: 'relative',
                            display: 'inline-flex',
                            maxHeight: '100%',
                            flexDirection: 'column',
                            borderRadius: '10px',
                            maxWidth: 400,
                            width: 400,
                            margin: '0 10px',
                            padding: '15px',
                            ...provided.draggableProps.style,
                        }}
                    >
                        <ColumnHeader
                            {...provided.dragHandleProps}
                            title={title}
                            onDelete={handleOnDeleteColumn}
                            onEdit={handleOnEditColumn}
                        />
                        <Droppable droppableId={columnId} type="COLUMN">
                            {(provided) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{
                                            marginTop: '10px',
                                            boxSizing: 'border-box',
                                            overflowY: 'auto',
                                            width: '100%',
                                            flex: 1,
                                        }}
                                    >
                                        {cards?.map((card, index) => {
                                            return (
                                                <Card
                                                    {...{
                                                        card,
                                                        index,
                                                        onDelete: handleOnDeleteCard(columnId),
                                                        onSave: handleOnEditCard(columnId),
                                                    }}
                                                    key={card.id}
                                                />
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                        <AddCard handleOnAddCard={handleOnAddCard(columnId)} />
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Column;
