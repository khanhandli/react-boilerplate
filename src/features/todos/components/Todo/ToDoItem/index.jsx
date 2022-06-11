import React from 'react';
import { Avatar, Badge, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { CloseCircleOutlined } from '@ant-design/icons';
const ToDoItem = ({ todo, onTodoSelect, onTodoChecked, onMarkAsStart, onDeleteLabel }) => {
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
                                    <Badge
                                        key={index}
                                        count={
                                            <div className="gx-text-white gx-px-2 gx-py-1 gx-rounded-xxl">
                                                {label.title}
                                                <CloseCircleOutlined
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onDeleteLabel(
                                                            todo.labels.filter((lb) => lb.id !== label.id),
                                                            todo.id
                                                        );
                                                    }}
                                                    style={{ fontWeight: 'bold', marginLeft: '6px' }}
                                                />
                                            </div>
                                        }
                                        style={{ backgroundColor: label.color }}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className="gx-module-todo-right">
                    {users && users?.length > 0 ? (
                        users.map((user, index) => (
                            <Avatar.Group maxCount={2} key={index}>
                                <Avatar alt={user.name} src={user.avatar} />
                            </Avatar.Group>
                        ))
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
