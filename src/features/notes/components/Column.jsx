import { Card as CardAntd } from 'antd';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Card from './Card';
import ColumnHeader from './ColumnHeader';
import AddCard from './AddCard';
import { NotesActions } from '@/app-redux/notes';

function withDroppable(Component) {
    return function WrapperComponent({ children, ...droppableProps }) {
        return (
            <Droppable {...droppableProps}>
                {(provided) => (
                    <Component ref={provided.innerRef} {...provided.droppableProps}>
                        {children}
                        {provided.placeholder}
                    </Component>
                )}
            </Droppable>
        );
    };
}

const ColumnEmptyPlaceholder = React.forwardRef((props, ref) => (
    <div ref={ref} className="custom-scroll-vertical" style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
));

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder);

const Column = ({ id: columnId, cards, index, title, handleOnDeleteColumn, handleOnEditColumn }) => {
    const dispatch = useDispatch();

    const handleOnAddCard = React.useCallback(
        (columnId) => (title) => dispatch(NotesActions.addCard({ title, columnId })),
        []
    );

    const handleOnDeleteCard = (columnId) => (cardId) => dispatch(NotesActions.deleteCard({ columnId, cardId }));

    const handleOnEditCard = (columnId) => (newCard) => dispatch(NotesActions.editCard({ columnId, newCard }));

    return (
        <Draggable draggableId={columnId} index={index}>
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="column-style"
                        style={{
                            maxHeight: 'calc(100vh - 170px)',
                            ...provided.draggableProps.style,
                        }}
                    >
                        <ColumnHeader
                            {...provided.dragHandleProps}
                            title={title}
                            onDelete={handleOnDeleteColumn}
                            onEdit={handleOnEditColumn}
                        />
                        <DroppableColumn droppableId={columnId}>
                            <Droppable droppableId={columnId} type="COLUMN" index={index}>
                                {(provided) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="gx-mt-2 gx-w-100"
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
                        </DroppableColumn>
                        <AddCard handleOnAddCard={handleOnAddCard(columnId)} />
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Column;
