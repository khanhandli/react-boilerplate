import * as utils from './utils';
import * as types from './types';
const SET_WINDOW_WIDTH = 'set_window_width';

const NotesActions = {
    addColumn: (payload) => ({
        type: types.ADD_COLUMN,
        payload,
    }),

    editColumn: (payload) => ({
        type: types.EDIT_COLUMN,
        payload,
    }),

    deleteColumn: (payload) => ({
        type: types.DELETE_COLUMN,
        payload,
    }),

    onDragEnd: (payload) => ({
        type: types.ON_DRAG_END,
        payload,
    }),

    addCard: (payload) => ({
        type: types.ADD_CARD,
        payload,
    }),

    deleteCard: (payload) => ({
        type: types.DELETE_CARD,
        payload,
    }),

    editCard: (payload) => ({
        type: types.EDIT_CARD,
        payload,
    }),
};

const initialState = utils.initializeState();

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ON_DRAG_END: {
            const { destination, source, type } = action.payload;
            const board = state.boards[state.currentBoard];

            // DROP TYPE BOARD
            if (type === 'BOARD') {
                const [moved] = board.columns.splice(source.index, 1);
                board.columns.splice(destination.index, 0, moved);
            }
            // DROP TYPE COLUMN
            else if (type === 'COLUMN') {
                // DIFFERENT COLUMNS
                if (source.droppableId !== destination.droppableId) {
                    const sourceCards = board.columns.find((col) => col.id === source.droppableId).cards;
                    const destinationCards = board.columns.find((col) => col.id === destination.droppableId).cards;

                    const [removed] = sourceCards.splice(source.index, 1);
                    destinationCards.splice(destination.index, 0, removed);
                    return { ...state };
                }
                // SAME COLUMN
                else {
                    const columnCards = board.columns.find((col) => col.id === source.droppableId).cards;
                    const [moved] = columnCards.splice(source.index, 1);
                    columnCards.splice(destination.index, 0, moved);
                    return { ...state };
                }
            }

            return { ...state };
        }
        case types.ADD_CARD: {
            const { title, columnId } = action.payload;
            const board = state.boards[state.currentBoard];
            const column = board.columns.find((col) => col.id === columnId);
            const newCard = utils.createCard(title);

            column.cards.push(newCard);
            return { ...state };
        }

        case types.ADD_COLUMN: {
            const { title } = action.payload;
            const board = state.boards[state.currentBoard];
            const newColumn = utils.createColumn(title);
            board.columns.push(newColumn);

            return { ...state };
        }
        case types.DELETE_COLUMN: {
            const { columnId } = action.payload;
            const board = state.boards[state.currentBoard];
            const newColumns = board.columns.filter((col) => col.id !== columnId);
            board.columns = newColumns;

            return { ...state };
        }
        case types.EDIT_COLUMN: {
            const { columnId, title } = action.payload;
            const board = state.boards[state.currentBoard];
            const column = board.columns.find((col) => col.id === columnId);
            column.title = title;

            return { ...state };
        }
        case types.DELETE_CARD: {
            const { columnId, cardId } = action.payload;
            const board = state.boards[state.currentBoard];
            const column = board.columns.find((col) => col.id === columnId);
            const newCards = column.cards.filter((card) => card.id !== cardId);
            column.cards = newCards;
            return { ...state };
        }
        case types.EDIT_CARD: {
            const { columnId, newCard } = action.payload;
            const board = state.boards[state.currentBoard];
            const column = board.columns.find((col) => col.id === columnId);
            const card = column.cards.find((card) => card.id === newCard.id);

            Object.assign(card, newCard);

            return { ...state };
        }
        default: {
            return state;
        }
    }
}

function getNotesModule() {
    return {
        id: 'notes',
        reducerMap: { notes: reducer },
    };
}

export { NotesActions, getNotesModule };
