import moment from 'moment';
import { Avatar, Badge, Col, DatePicker, Input, Row } from 'antd';
import CustomScrollbars from '@/components/CustomScrollbars';
import React from 'react';
import labels from '../../../data/labels';
import ConversationCell from './ConversationCell';

const initialState = {
    todo: {},
    title: '',
    notes: '',
    anchorEl: undefined,
    userMenu: false,
    labelMenu: false,
    editTitle: false,
    editNote: false,
    message: '',
    conversation: '',
};

const ToDoDetail = ({ onToDoUpdate, onDeleteToDo, conversation, todo, ...props }) => {
    const { title, notes } = todo;
    const [valueTodoDetail, setValueTodoDetail] = React.useState({ ...initialState, todo, conversation, ...todo });
    const [user, setUser] = React.useState(props.user ?? null);

    const handleUserClick = (e) => {
        setValueTodoDetail({ ...valueTodoDetail, userMenu: true, anchorEl: e.currentTarget });
    };

    const handleDueDateChange = (date) => {
        setValueTodoDetail({ ...valueTodoDetail, todo: { ...valueTodoDetail.todo, dueDate: date } });
    };

    const handleLabelClick = (event) => {
        setValueTodoDetail({ ...valueTodoDetail, labelMenu: true, anchorEl: event.currentTarget });
    };

    const handleEditTitle = () => {
        if (valueTodoDetail.editTitle) {
            const todo = valueTodoDetail.todo;
            todo.title = valueTodoDetail.title;
            onToDoUpdate(todo);
        }
        setValueTodoDetail({ ...valueTodoDetail, editTitle: !valueTodoDetail.editTitle });
    };

    const handleEditNote = () => {
        if (valueTodoDetail.note) {
            const todo = valueTodoDetail.todo;
            todo.note = valueTodoDetail.note;
            onToDoUpdate(todo);
        }
        setValueTodoDetail({ ...valueTodoDetail, editNote: !valueTodoDetail.editNote });
    };

    const submitComment = () => {
        if (valueTodoDetail.message !== '') {
            const updatedConversation = valueTodoDetail.conversation.concat({
                name: user.name,
                thumb: user.avatar,
                message: valueTodoDetail.message,
                sentAt: moment().format('ddd DD, YYYY, hh:mm:ss A'),
            });

            setValueTodoDetail({ ...valueTodoDetail, conversation: updatedConversation, message: '' });
        }
    };

    const _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitComment();
        }
    };

    return (
        <div className="gx-module-detail gx-module-list">
            <CustomScrollbars className="gx-todo-detail-content-scroll">
                <div className="gx-module-detail-item gx-module-detail-header">
                    <Row>
                        <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                            <div className="gx-flex-row">
                                <div className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1" onClick={handleUserClick}>
                                    {user === null ? (
                                        <h4 className="gx-mb-0 gx-pointer">Assign User </h4>
                                    ) : (
                                        <div className="gx-flex-row gx-align-items-center gx-pointer">
                                            <Avatar className="gx-mr-2" src={user.thumb} alt={user.name} />
                                            <h4 className="gx-mb-0">{user.name}</h4>
                                        </div>
                                    )}
                                </div>
                                <DatePicker
                                    className="gx-module-date gx-my-1"
                                    defaultValue={
                                        valueTodoDetail.todo.dueDate !== null
                                            ? moment(valueTodoDetail.todo.dueDate, 'dddd, MMMM DD, YYYY h:mm a')
                                            : undefined
                                    }
                                    invalidLabel="Due Date"
                                    format="MMMM DD, YYYY"
                                    onChange={handleDueDateChange}
                                    animateYearScrolling={false}
                                />
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={7} lg={12} xl={7}>
                            <div className="gx-flex-row gx-justify-content-between">
                                <i
                                    className="gx-icon-btn icon icon-trash"
                                    onClick={() => {
                                        onDeleteToDo(todo);
                                    }}
                                />

                                <span
                                    className="gx-d-block"
                                    onClick={() => {
                                        valueTodoDetail.todo.starred = !valueTodoDetail.todo.starred;
                                        onToDoUpdate(valueTodoDetail.todo);
                                    }}
                                >
                                    {valueTodoDetail.todo.starred ? (
                                        <i className="gx-icon-btn icon icon-star" />
                                    ) : (
                                        <i className="gx-icon-btn icon icon-star-o" />
                                    )}
                                </span>

                                <span
                                    className="gx-d-block"
                                    onClick={() => {
                                        valueTodoDetail.todo.important = !valueTodoDetail.todo.important;
                                        onToDoUpdate(valueTodoDetail.todo);
                                    }}
                                >
                                    {valueTodoDetail.todo.important ? (
                                        <i className="gx-icon-btn icon icon-important" />
                                    ) : (
                                        <i className="gx-icon-btn icon icon-important-o" />
                                    )}
                                </span>
                                <span className="gx-d-block" onClick={handleLabelClick}>
                                    <i className="gx-icon-btn icon icon-tag" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="gx-module-detail-item">
                    <div className="gx-mb-md-4 gx-mb-2">
                        {labels.map((label, index) => {
                            return (
                                valueTodoDetail.todo.labels.includes(label.id) && (
                                    <Badge key={index} count={label.title} style={{ backgroundColor: label.color }} />
                                )
                            );
                        })}
                    </div>

                    <div className="gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap">
                        <div
                            onClick={(event) => {
                                valueTodoDetail.todo.completed = !valueTodoDetail.todo.completed;
                                onToDoUpdate(valueTodoDetail.todo);
                            }}
                        >
                            {valueTodoDetail.todo.completed ? (
                                <span className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-green gx-border-green gx-d-block gx-text-center gx-pointer">
                                    <i className="icon icon-check" />
                                </span>
                            ) : (
                                <span className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-muted gx-border-grey gx-d-block gx-text-center gx-pointer">
                                    <i className="icon icon-check" />
                                </span>
                            )}
                        </div>
                        {valueTodoDetail.editTitle ? (
                            <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                                <div className="gx-col">
                                    <Input
                                        fullWidth
                                        className="gx-task-title"
                                        id="required"
                                        placeholder="Title"
                                        onChange={(event) =>
                                            setValueTodoDetail({ ...valueTodoDetail, title: event.target.value })
                                        }
                                        defaultValue={valueTodoDetail.title}
                                    />
                                </div>

                                <span
                                    className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                    onClick={handleEditTitle}
                                >
                                    <i className="gx-icon-btn icon icon-edit" />
                                </span>
                            </div>
                        ) : (
                            <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                                <div className="gx-task-title gx-col">{title}</div>
                                <span
                                    className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                    onClick={handleEditTitle}
                                >
                                    <i className="gx-icon-btn icon icon-edit" />
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="gx-module-detail-item gx-mb-md-4 gx-mb-2">
                    {valueTodoDetail.editNote ? (
                        <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                            <div className="gx-task-input gx-col">
                                <Input
                                    fullWidth
                                    id="required"
                                    placeholder="Note"
                                    onChange={(event) =>
                                        setValueTodoDetail({ ...valueTodoDetail, notes: event.target.value })
                                    }
                                    defaultValue={valueTodoDetail.notes}
                                />
                            </div>

                            <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={handleEditNote}>
                                <i className="gx-icon-btn icon icon-edit" />
                            </span>
                        </div>
                    ) : (
                        <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                            <div className="gx-task-des gx-col">
                                {valueTodoDetail.notes === '' ? 'Add note here' : valueTodoDetail.notes}
                            </div>
                            <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={handleEditNote}>
                                <i className="gx-icon-btn icon icon-edit" />
                            </span>
                        </div>
                    )}
                </div>
                <div className="gx-module-detail-item">
                    <h3 className="gx-mb-0 gx-mb-sm-1">Comments</h3>
                </div>
                {valueTodoDetail.conversation.map((conversation, index) => (
                    <ConversationCell key={index} conversation={conversation} />
                ))}
            </CustomScrollbars>

            <div className="gx-chat-main-footer gx-todo-main-footer">
                <div className="gx-flex-row gx-align-items-center">
                    <div className="gx-col">
                        <div className="gx-form-group">
                            <Input.TextArea
                                className="gx-border-0 ant-input gx-chat-textarea"
                                id="required"
                                onKeyUp={_handleKeyPress}
                                onChange={(e) => setValueTodoDetail({ ...valueTodoDetail, message: e.target.value })}
                                value={valueTodoDetail.message}
                                rows={2}
                                placeholder="Type and hit enter to send message"
                            />
                        </div>
                    </div>

                    <div className="gx-chat-sent" onClick={submitComment} aria-label="Send message">
                        <i className="gx-icon-btn icon icon-sent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoDetail;
