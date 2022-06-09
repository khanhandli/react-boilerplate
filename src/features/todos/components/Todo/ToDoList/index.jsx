import CustomScrollbars from '@/components/CustomScrollbars';
import React from 'react';

import ToDoItem from '../ToDoItem';

const ToDoList = ({ allToDos, onTodoSelect, onTodoChecked, onMarkAsStart }) => {
    return (
        <div className="gx-module-list">
            <CustomScrollbars className="gx-module-content-scroll">
                {allToDos.map((todo, index) => (
                    <ToDoItem
                        key={index}
                        index={index}
                        todo={todo}
                        onTodoSelect={onTodoSelect}
                        onMarkAsStart={onMarkAsStart}
                        onTodoChecked={onTodoChecked}
                    />
                ))}
            </CustomScrollbars>
        </div>
    );
};

export default ToDoList;
