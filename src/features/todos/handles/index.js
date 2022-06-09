export const getAllTodo = (allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName) => {
    const toDos = allToDos.map((todo) =>
        todo
            ? {
                  ...todo,
                  selected: true,
              }
            : todo
    );
    setToDos([]);
    setSelectedToDos(toDos.length);
    setAllToDos(toDos);
    setOptionName('Tất cả');
};

export const getUnselectedAllTodo = (allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName) => {
    const toDos = allToDos.map((todo) =>
        todo
            ? {
                  ...todo,
                  selected: false,
              }
            : todo
    );
    setToDos([]);
    setSelectedToDos(0);
    setAllToDos(toDos);
    setOptionName('Không chọn');
};

export const getStarredToDo = (allToDos, setToDos, setSelectedToDos, setOptionName) => {
    let selectedToDos = 0;

    const toDos1 = allToDos.map((todo) => {
        if (todo?.starred) {
            selectedToDos++;
            return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
    });
    setSelectedToDos(selectedToDos);
    setOptionName('Có gắn dấu sao');
    setToDos(toDos1.filter((todo) => todo?.starred));
};

export const getUnStarredTodo = (allToDos, setToDos, setSelectedToDos, setOptionName) => {
    console.log('first');
    let selectedToDos = 0;
    const toDos2 = allToDos.map((todo) => {
        if (!todo?.starred) {
            selectedToDos++;
            return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
    });

    setSelectedToDos(selectedToDos);
    setOptionName('Chưa gắn dấu sao');
    setToDos(toDos2.filter((todo) => !todo?.starred));
};

export const getImportantToDo = (allToDos, setToDos, setSelectedToDos, setOptionName) => {
    let selectedToDos = 0;
    let toDos = allToDos.map((todo) => {
        if (todo.important) {
            selectedToDos++;
            return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
    });

    setSelectedToDos(selectedToDos);
    setOptionName('Quan trọng');
    setToDos(toDos.filter((todo) => todo?.important));
};
export const getUnimportantToDo = (allToDos, setToDos, setSelectedToDos, setOptionName) => {
    let selectedToDos = 0;
    let toDos = allToDos.map((todo) => {
        if (!todo.important) {
            selectedToDos++;
            return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
    });
    setSelectedToDos(selectedToDos);
    setOptionName('Không quan trọng');
    setToDos(toDos.filter((todo) => !todo?.important));
};
