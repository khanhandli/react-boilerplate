import React from 'react';
import Board from '../components/Board';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { NotesActions } from '@/app-redux/notes';
import CustomScrollbars from '@/components/CustomScrollbars';

const board = {
    id: Math.random().toString(),
    title: 'Fresh Board',
    columns: [
        {
            id: Math.random().toString(),
            title: 'Todo',
            cards: [
                {
                    id: Math.random().toString(),
                    title: 'This is a card',
                    img: 'https://cdn.pixabay.com/photo/2021/01/09/20/33/sunset-5903426_960_720.jpg',
                },
                {
                    id: Math.random().toString(),
                    title: 'This is a card 2',
                    img: 'https://cdn.pixabay.com/photo/2021/04/13/05/20/beach-6174684_960_720.jpg',
                },
                {
                    id: Math.random().toString(),
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
            ],
        },
        { id: Math.random().toString(), title: 'In Progress', cards: [] },
        { id: Math.random().toString(), title: 'Done', cards: [] },
    ],
};

const NotesPage = () => {
    const dispatch = useDispatch();
    const { boards, currentBoard, board = boards[currentBoard] } = useSelector((state) => state.notes);

    const handleOnDragEnd = (result) => {
        console.log('🚀 ~ file: index.jsx ~ line 43 ~ handleOnDragEnd ~ result', result);
        result.destination && dispatch(NotesActions.onDragEnd(result));
    };

    return (
        <CustomScrollbars>
            <div style={{ display: 'flex', height: 'calc(100vh - 152px)' }}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Board id={board.id} columns={board.columns} />
                </DragDropContext>
            </div>
        </CustomScrollbars>
    );
};

export default NotesPage;
