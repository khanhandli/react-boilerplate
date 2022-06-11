import moment from 'moment';
import { Avatar, Badge, Col, DatePicker, Dropdown, Input, Menu, message as msgAntd, Row, Tooltip } from 'antd';
import CustomScrollbars from '@/components/CustomScrollbars';
import React from 'react';
import ConversationCell from './ConversationCell';
import PopcomfirmComponent from '@/components/Popcomfirm';
import { CloseCircleOutlined } from '@ant-design/icons';
import RichCkeditor from '@/components/Editor/RichCkeditor';
import { putDataAPI, deleteDataAPI } from '@/apis';
import { htmlDecode } from '@/utils';

const initialState = {
    userMenu: false,
    editTitle: false,
    editNote: false,
};

const ToDoDetail = ({ setCurrentTodo, auth, labels: labelsList, todo, callback, setCallback }) => {
    const { id, title, notes, users, dueDate, starred, important, labels, completed, comments: commentsTodos } = todo;
    const [valueTodoDetail, setValueTodoDetail] = React.useState({ ...initialState, todo, ...todo });

    const [editAddUser, setEditAddUser] = React.useState(false);
    const [body, setBody] = React.useState(htmlDecode(notes));
    const [valueDueDate, setValueDueDate] = React.useState(dueDate);
    const [valueTitle, setValueTitle] = React.useState(title);
    const [message, setMessage] = React.useState('');
    const [comments, setComments] = React.useState(commentsTodos);

    const messagesEndRef = React.useRef(null);
    const { user, socket } = auth;

    const handleUserClick = (e) => {
        console.log('🚀 ~ file: index.jsx ~ line 35 ~ handleUserClick ~ e', e);
        // setValueTodoDetail({ ...valueTodoDetail, userMenu: true, anchorEl: e.currentTarget });
    };

    const handleUpdateChange = async (data, success, condition) => {
        if (condition) return;
        const res = await putDataAPI(`v2/todos/${id}`, data);
        if (res.status) {
            msgAntd.success(success);
            setCallback(!callback);
        }
    };

    const onLabelMenuItemSelect = async (e) => {
        const labelId = +e.key;

        if (labels.some((lb) => lb.id === labelId)) {
            msgAntd.error('Công việc đã có nhãn này!');
            return;
        }

        handleUpdateChange(
            { labels: JSON.stringify([...labels.map((item) => item.id), labelId]) },
            'Thêm nhãn thành công!',
            false
        );
    };

    const labelMenu = () => {
        const items = labelsList.map((label) => ({ label: label.title, key: label.id }));
        return <Menu onClick={onLabelMenuItemSelect} items={items} />;
    };

    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', id.toString());
        }
    }, [socket, id]);

    React.useEffect(() => {
        if (socket) {
            socket.on('sendCommentToClient', (newComment) => {
                setComments([...comments, { ...newComment }]);
            });

            return () => socket.off('sendCommentToClient');
        }
    }, [socket, comments]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const submitComment = () => {
        if (message !== '') {
            const comment = {
                name: user.name,
                message,
                avatar: user.avatar,
                todo_id: id.toString(),
                sentAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };

            socket.emit('createComment', comment);
            setComments([...comments, { ...comment }]);
            setMessage('');
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
                <div className="gx-pb-2 gx-pt-2 gx-module-detail-item gx-module-detail-header">
                    <Row>
                        <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                            <div className="gx-flex-row">
                                <div
                                    className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1 gx-d-flex gx-justify-content-center gx-align-items-center"
                                    onClick={handleUserClick}
                                >
                                    {users && users.length > 0 ? (
                                        <div className="gx-flex-row gx-align-items-center gx-pointer">
                                            {users.map((user) => (
                                                <Avatar.Group maxCount={2} key={user.id}>
                                                    <Avatar className="gx-mr-2" src={user.avatar} alt={user.name} />
                                                </Avatar.Group>
                                            ))}
                                            <h4 className="gx-mb-0">{users[0].name}</h4>
                                        </div>
                                    ) : (
                                        <h4 className="gx-mb-0 gx-pointer">Thêm thành viên</h4>
                                    )}
                                </div>
                                <DatePicker
                                    className="gx-w-50 gx-my-1"
                                    style={{ width: '200px' }}
                                    defaultValue={
                                        dueDate && dueDate !== null ? moment(dueDate, 'DD/MM/YYYY') : undefined
                                    }
                                    invalidLabel="Đến hạn"
                                    format="DD/MM/YYYY"
                                    onChange={(date) => setValueDueDate(moment(date).format('DD/MM/YYYY'))}
                                    onBlur={() =>
                                        handleUpdateChange(
                                            {
                                                dueDate: valueDueDate,
                                            },
                                            'Cập nhật ngày hoàn thành thành công',
                                            dueDate === valueDueDate
                                        )
                                    }
                                    animateYearScrolling={false}
                                />
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={7} lg={12} xl={7}>
                            <div className="gx-flex-row gx-justify-content-between">
                                {
                                    <PopcomfirmComponent
                                        onComfirm={async () => {
                                            const res = await deleteDataAPI(`v2/todos/${id}`);
                                            if (res.status === 200) {
                                                setCallback(!callback);
                                                setCurrentTodo(null);
                                            }
                                        }}
                                        title="Bạn chắc chắn muốn xóa"
                                    >
                                        <i className="gx-icon-btn icon icon-trash" />
                                    </PopcomfirmComponent>
                                }

                                <Tooltip title="Gắn sao">
                                    <span
                                        className="gx-d-block"
                                        onClick={() =>
                                            handleUpdateChange(
                                                {
                                                    starred: !starred,
                                                },
                                                'Cập nhật sao thành công',
                                                false
                                            )
                                        }
                                    >
                                        {starred ? (
                                            <i className="gx-icon-btn icon icon-star" />
                                        ) : (
                                            <i className="gx-icon-btn icon icon-star-o" />
                                        )}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Quan trọng">
                                    <span
                                        className="gx-d-block"
                                        onClick={() => {
                                            handleUpdateChange(
                                                {
                                                    important: !important,
                                                },
                                                'Cập nhật công việc quan trọng',
                                                false
                                            );
                                        }}
                                    >
                                        {important ? (
                                            <i className="gx-icon-btn icon icon-important" />
                                        ) : (
                                            <i className="gx-icon-btn icon icon-important-o" />
                                        )}
                                    </span>
                                </Tooltip>

                                <Tooltip title="Nhãn">
                                    <Dropdown overlay={labelMenu} placement="bottomRight">
                                        <span className="gx-d-block">
                                            <i className="gx-icon-btn icon icon-tag" />
                                        </span>
                                    </Dropdown>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="gx-module-detail-item">
                    <div className="gx-mb-md-4 gx-mb-2">
                        {labels &&
                            labels.length > 0 &&
                            labels.map((label, index) => {
                                return (
                                    <Badge
                                        key={index}
                                        count={
                                            <div className="gx-text-white gx-px-2 gx-py-1 gx-rounded-xxl">
                                                {label.title}
                                                <CloseCircleOutlined
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const res = await putDataAPI(`v2/todos/${id}`, {
                                                            labels: JSON.stringify(
                                                                labels
                                                                    .filter((lb) => lb.id !== label.id)
                                                                    .map((label) => label.id)
                                                            ),
                                                        });
                                                        if (res.status === 200) {
                                                            setCallback(!callback);
                                                        }
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

                    <div className="gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap">
                        <div
                            onClick={() => {
                                handleUpdateChange(
                                    {
                                        completed: !completed,
                                    },
                                    'Cập nhật trạng thái thành công',
                                    false
                                );
                            }}
                        >
                            {completed ? (
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
                                        className="gx-task-title"
                                        id="required"
                                        placeholder="Title"
                                        onChange={(event) => setValueTitle(event.target.value)}
                                        defaultValue={title}
                                    />
                                </div>

                                <span
                                    onClick={() => {
                                        handleUpdateChange(
                                            {
                                                title: valueTitle,
                                            },
                                            'Cập nhật tên công việc',
                                            valueTitle === title
                                        );
                                        setValueTodoDetail({
                                            ...valueTodoDetail,
                                            editTitle: !valueTodoDetail.editTitle,
                                        });
                                    }}
                                    className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                >
                                    <i className="gx-icon-btn icon icon-check-cricle" />
                                </span>
                            </div>
                        ) : (
                            <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                                <div className="gx-task-title gx-col">{title}</div>
                                <span
                                    className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                    onClick={() =>
                                        setValueTodoDetail({
                                            ...valueTodoDetail,
                                            editTitle: !valueTodoDetail.editTitle,
                                        })
                                    }
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
                                <RichCkeditor body={body} setBody={setBody} />
                            </div>

                            <span
                                className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                onClick={() => {
                                    handleUpdateChange(
                                        {
                                            notes: body,
                                        },
                                        'Cập nhật mô tả',
                                        htmlDecode(notes) === body
                                    );
                                    setValueTodoDetail({ ...valueTodoDetail, editNote: !valueTodoDetail.editNote });
                                }}
                            >
                                <i className="gx-icon-btn icon icon icon-check-cricle" />
                            </span>
                        </div>
                    ) : (
                        <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                            <span dangerouslySetInnerHTML={{ __html: !notes ? 'Thêm mô tả' : body }} />
                            <span
                                className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                                onClick={() =>
                                    setValueTodoDetail({ ...valueTodoDetail, editNote: !valueTodoDetail.editNote })
                                }
                            >
                                <i className="gx-icon-btn icon icon-edit" />
                            </span>
                        </div>
                    )}
                </div>
                <div className="gx-module-detail-item gx-d-flex gx-align-items-center">
                    <h3 className="gx-mb-0 gx-mr-2 gx-mb-sm-1">Bình luận </h3>
                    {page > 1 && (
                        <span onClick={() => setPage((prev) => prev - 1)} className="gx-pointer gx-text-underline">
                            Ẩn bớt
                        </span>
                    )}
                </div>
                {comments && comments.length > 9 && page * 10 < comments.length ? (
                    <div
                        onClick={() => setPage((prev) => prev + 1)}
                        className="gx-text-center gx-mt-4 gx-text-underline gx-pointer"
                    >
                        Tải thêm bình luận
                    </div>
                ) : (
                    <></>
                )}
                {comments &&
                    comments.length > 0 &&
                    comments
                        .sort((a, b) => a.id - b.id)
                        .slice(comments.length - page * 10 > 0 ? comments.length - page * 10 : 0)
                        .map((conversation, index) => <ConversationCell key={index} conversation={conversation} />)}
                <div className="gx-mb-2" ref={messagesEndRef} />
            </CustomScrollbars>

            <div className="gx-chat-main-footer gx-todo-main-footer">
                <div className="gx-flex-row gx-align-items-center">
                    <div className="gx-col">
                        <div className="gx-form-group">
                            <Input.TextArea
                                className="gx-border-0 ant-input gx-chat-textarea"
                                id="required"
                                onKeyUp={_handleKeyPress}
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                rows={2}
                                placeholder="Nhập và nhấn enter để gửi tin nhắn"
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

export default React.memo(ToDoDetail);
