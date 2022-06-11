import React from 'react';
import CustomScrollbars from '@/components/CustomScrollbars';

import ToDoItem from '../ToDoItem';

const ToDoList = ({ allToDos, onTodoSelect, onTodoChecked, onMarkAsStart, onDeleteLabel }) => {
    return (
        <div className="gx-module-list">
            <CustomScrollbars className="gx-module-content-scroll">
                {allToDos.map((todo, index) => (
                    <ToDoItem
                        key={index}
                        index={index}
                        todo={todo}
                        onDeleteLabel={onDeleteLabel}
                        onTodoSelect={onTodoSelect}
                        onMarkAsStart={onMarkAsStart}
                        onTodoChecked={onTodoChecked}
                    />
                ))}
            </CustomScrollbars>
        </div>
    );
};

export default React.memo(ToDoList);
