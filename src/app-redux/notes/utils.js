const LOCALSTORAGE_KEY = 'trello ¯_(ツ)_/¯';

export const initializeState = () => {
    const newBoard = createBoard();

    return { boards: { [newBoard.id]: newBoard }, currentBoard: newBoard.id };
};

const createBoard = () => ({
    id: '1',
    title: 'Fresh Board',
    columns: [
        {
            id: '2',
            title: 'Todo',
            cards: [
                {
                    id: '3',
                    title: 'This is a card',
                    img: 'https://cdn.pixabay.com/photo/2021/01/09/20/33/sunset-5903426_960_720.jpg',
                },
                {
                    id: '4',
                    title: 'This is a card 2',
                    img: 'https://cdn.pixabay.com/photo/2021/04/13/05/20/beach-6174684_960_720.jpg',
                },
                {
                    id: '5',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '61',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '71',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '8',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '9',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '10',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '11',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '12',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
                {
                    id: '13',
                    title: 'This is a card 3',
                    img: 'https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg',
                },
            ],
        },
        { id: '6', title: 'In Progress', cards: [] },
        { id: '7', title: 'Done', cards: [] },
    ],
});

export const createCard = (title) => ({
    id: Math.random().toString(),
    title,
    img: '',
});

export const createColumn = (title) => ({
    id: Math.random().toString(),
    title,
    cards: [],
});

export const getStateFromLocalStorage = () => JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

export const setStateToLocalStorage = (state) => localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
