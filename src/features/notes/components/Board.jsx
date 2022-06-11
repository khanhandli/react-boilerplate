import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import AddColumn from './AddColumn';
import { useDispatch } from 'react-redux';
import { NotesActions } from '@/app-redux/notes';

const Board = ({ id: boardId, columns }) => {
    const dispatch = useDispatch();

    const handleOnAddColumn = (title) => dispatch(NotesActions.addColumn({ title }));

    const handleOnDeleteColumn = (columnId) => () => dispatch(NotesActions.deleteColumn({ columnId }));

    const handleOnEditColumn = (columnId) => (title) => dispatch(NotesActions.editColumn({ title, columnId }));

    return (
        <>
            <Droppable droppableId={boardId} type="BOARD" direction="horizontal">
                {(provided) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                display: 'flex',
                                height: '100%',
                                overflowY: 'hidden',
                            }}
                        >
                            {columns.map(({ id: columnId, cards, title }, index) => (
                                <div
                                    style={{
                                        height: '100%',
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                    }}
                                    key={columnId}
                                >
                                    <Column
                                        {...{
                                            index,
                                            id: columnId,
                                            cards,
                                            title,
                                            handleOnDeleteColumn: handleOnDeleteColumn(columnId),
                                            handleOnEditColumn: handleOnEditColumn(columnId),
                                        }}
                                        key={columnId}
                                    />
                                </div>
                            ))}
                            {provided.placeholder}
                            <div className={{ marginLeft: '20px' }}>
                                <AddColumn handleOnAddColumn={handleOnAddColumn} />
                            </div>
                        </div>
                    );
                }}
            </Droppable>
        </>
    );
};

export default Board;
