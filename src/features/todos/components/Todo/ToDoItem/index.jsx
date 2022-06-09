import React from 'react';
import { Avatar, Badge, Checkbox } from 'antd';
import PropTypes from 'prop-types';

const ToDoItem = ({ todo, onTodoSelect, onTodoChecked, onMarkAsStart }) => {
    const { users, labels, title, completed, starred, selected } = todo;

    return (
        <div className="gx-module-list-item">
            <div className="gx-module-list-icon">
                <Checkbox
                    color="primary"
                    checked={selected}
                    onClick={(event) => {
                        event.stopPropagation();
                        onTodoChecked(todo);
                    }}
                    value="SelectTodo"
                    className="gx-icon-btn"
                />

                <div
                    onClick={() => {
                        onMarkAsStart({ ...todo, starred: !starred });
                    }}
                >
                    {starred ? (
                        <i className="gx-icon-btn icon icon-star" />
                    ) : (
                        <i className="gx-icon-btn icon icon-star-o" />
                    )}
                </div>
            </div>
            <div
                className="gx-module-list-info"
                onClick={() => {
                    onTodoSelect(todo);
                }}
            >
                <div className="gx-module-todo-content">
                    <div className={`gx-subject ${completed && 'gx-text-muted gx-text-strikethrough'}`}>{title}</div>
                    <div className="gx-manage-margin">
                        {labels &&
                            labels?.length > 0 &&
                            labels.map((label, index) => {
                                return (
                                    <Badge key={index} count={label.title} style={{ backgroundColor: label.color }} />
                                );
                            })}
                    </div>
                </div>
                <div className="gx-module-todo-right">
                    {users && users?.length > 0 ? (
                        users.map((user, index) => <Avatar key={index} alt={user.name} src={user.avatar} />)
                    ) : (
                        <Avatar>U</Avatar>
                    )}
                </div>
            </div>
        </div>
    );
};

ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onTodoSelect: PropTypes.func,
    onTodoChecked: PropTypes.func,
    onMarkAsStart: PropTypes.func,
};

export default ToDoItem;
