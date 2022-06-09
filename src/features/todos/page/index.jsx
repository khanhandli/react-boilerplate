import AppModuleHeader from '@/components/AppModuleHeader';
import Auxiliary from '@/components/Auxiliary';
import CircularProgress from '@/components/CircularProgress';
import { Checkbox, Drawer, Dropdown, Menu, message as msgAntd } from 'antd';
import React from 'react';
import { getDataAPI, putDataAPI } from '@/apis';
import ToDoDetail from '../components/Todo/ToDoDetail';
import ToDoList from '../components/Todo/ToDoList';
import ToDoSideBar from '../components/ToDoSideBar';
import filtersList from '../data/filters';
import options from '../data/options';
import todoList from '../data/todo';
import labelsInit from '../data/labels';
import todoConversation from '../data/todoConversation';
import {
    getAllTodo,
    getImportantToDo,
    getStarredToDo,
    getUnimportantToDo,
    getUnselectedAllTodo,
    getUnStarredTodo,
} from '../handles';
const ITEM_HEIGHT = 34;

const TodoPage = () => {
    const [drawerState, setDrawerState] = React.useState(false);
    const [filter, setFilter] = React.useState('-1');
    const [allToDos, setAllToDos] = React.useState([]);
    console.log('🚀 ~ file: index.jsx ~ line 21 ~ TodoPage ~ allToDos', allToDos);
    const [labels, setLabels] = React.useState(labelsInit);
    const [searchTodo, setSearchTodo] = React.useState('');
    const [toDos, setToDos] = React.useState([]);

    const [currentTodo, setCurrentTodo] = React.useState(null);
    const [selectedToDos, setSelectedToDos] = React.useState(0);
    console.log('🚀 ~ file: index.jsx ~ line 28 ~ TodoPage ~ selectedToDos', selectedToDos);

    const [optionName, setOptionName] = React.useState('Không chọn');
    const [showMessage, setShowMessage] = React.useState(false);
    const [addTodo, setAddTodo] = React.useState(false);
    const [labelMenuState, setLabelMenuState] = React.useState(false);
    const [optionMenuState, setOptionMenuState] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [conversation, setConversation] = React.useState([]);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [user, setUser] = React.useState({
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://via.placeholder.com/150x150',
    });

    const [callback, setCallback] = React.useState(false);

    const onToggleDrawer = () => {
        setDrawerState(!drawerState);
    };

    const handleSearchTodo = (searchText) => {
        if (searchText === '') {
            setToDos(allToDos.filter((todo) => !todo.deleted));
        } else {
            const searchToDos = allToDos.filter(
                (todo) => !todo.deleted && todo.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            );
            setToDos(searchToDos);
        }
    };

    const updateSearch = (evt) => {
        setSearchTodo(evt.target.value);
        handleSearchTodo(evt.target.value);
    };

    const onAllTodoSelect = () => {
        const selectAll = allToDos.every((todo) => todo.selected);
        if (!selectAll && !(toDos?.length > 0)) {
            getAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
        } else {
            getUnselectedAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
        }
    };

    const onOptionMenuItemSelect = (e) => {
        switch (e.key) {
            case '1':
                handleRequestClose();
                getAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
                break;
            case '2':
                handleRequestClose();
                getUnselectedAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
                break;
            case '3':
                handleRequestClose();
                getStarredToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '4':
                handleRequestClose();
                getUnStarredTodo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '5':
                handleRequestClose();
                getImportantToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '6':
                handleRequestClose();
                getUnimportantToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            default:
                return '';
        }
    };

    const handleRequestClose = () => {
        setShowMessage(false);
        setAddTodo(false);
        setLabelMenuState(false);
        setOptionMenuState(false);
    };

    const optionMenu = () => {
        const items = options.map((option) => ({ label: option.title, key: option.key }));
        return (
            <Menu
                id="option-menu"
                onClick={onOptionMenuItemSelect}
                onClose={handleRequestClose}
                style={{ maxHeight: ITEM_HEIGHT * 6 }}
                items={items}
            />
        );
    };

    function removeLabel(todo, label) {
        todo.labels.splice(todo.labels.indexOf(label), 1);
        return todo.labels;
    }

    function addLabel(todo, label) {
        todo.labels = todo.labels.concat(label);
        return todo.labels;
    }

    const onLabelMenuItemSelect = (e) => {
        const label = +e.key;
        handleRequestClose();
        const toDos = allToDos.map((todo) => {
            if (todo.selected) {
                if (todo.labels.includes(label.id)) {
                    return { ...todo, labels: removeLabel(todo, label.id) };
                } else {
                    return { ...todo, labels: addLabel(todo, label.id) };
                }
            } else {
                return todo;
            }
        });
        setAlertMessage('Label Updated Successfully');
        setShowMessage(true);
        setToDos(toDos);
    };

    const labelMenu = () => {
        const items = labels.map((label) => ({ label: label.title, key: label.id }));
        return <Menu onClick={onLabelMenuItemSelect} onClose={handleRequestClose} items={items} />;
    };

    function getToDoConversation(id) {
        return todoConversation.find((conversation) => conversation.id === id);
    }

    // const getLabels = async() => {
    //     const res = await getDataAPI('/labels');
    // }

    const getTodos = async () => {
        setLoader(true);
        const res = await getDataAPI(`v2/todos?page=1&size=10&${filter ? 'filter=' + [filter?.handle] : ''}`);
        if (res.status === 200) {
            setAllToDos(res.data.list_todo);
            // setToDos(res.data.list_todo);
            setLoader(false);
        }
    };

    React.useEffect(() => {
        getTodos();
        // getLabels();
        // getToDoConversation();
    }, [filter, callback]);

    return (
        <div className="gx-main-content">
            <div className="gx-app-module">
                <div className="gx-d-block gx-d-lg-none">
                    <Drawer placement="left" closable={false} visible={drawerState} onClose={onToggleDrawer}>
                        <ToDoSideBar filter={filter} setFilter={setFilter} labels={labels} />
                    </Drawer>
                </div>
                <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
                    <ToDoSideBar filter={filter} setFilter={setFilter} labels={labels} />
                </div>

                <div className="gx-module-box">
                    <div className="gx-module-box-header">
                        <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                            <i className="icon icon-menu gx-icon-btn" aria-label="Menu" onClick={onToggleDrawer} />
                        </span>
                        <AppModuleHeader
                            placeholder="Search To Do"
                            // user={this.state.user}
                            onChange={updateSearch}
                            value={searchTodo}
                        />
                    </div>
                    <div className="gx-module-box-content">
                        {currentTodo === null ? (
                            <div className="gx-module-box-topbar gx-module-box-topbar-todo">
                                {allToDos?.length > 0 ? (
                                    <Auxiliary>
                                        <Checkbox
                                            className="gx-icon-btn"
                                            color="primary"
                                            indeterminate={(toDos && toDos.length > 0 ? toDos : allToDos).every(
                                                (todo) => todo.selected
                                            )}
                                            checked={selectedToDos > 0}
                                            onChange={onAllTodoSelect}
                                            value="SelectMail"
                                        />
                                        <Dropdown overlay={optionMenu} placement="bottomRight" trigger={['click']}>
                                            <div>
                                                <span className="gx-px-2"> {optionName}</span>
                                                <i className="icon icon-charvlet-down" />
                                            </div>
                                        </Dropdown>
                                    </Auxiliary>
                                ) : null}

                                {selectedToDos > 0 && (
                                    <Dropdown overlay={labelMenu} placement="bottomRight">
                                        <i className="gx-icon-btn icon icon-tag" />
                                    </Dropdown>
                                )}
                            </div>
                        ) : (
                            <div className="gx-module-box-topbar">
                                <i className="icon icon-arrow-left gx-icon-btn" onClick={() => setCurrentTodo(null)} />
                            </div>
                        )}
                        {loader ? (
                            <div className="gx-loader-view">
                                <CircularProgress />
                            </div>
                        ) : currentTodo === null ? (
                            <ToDoList
                                allToDos={toDos && toDos.length > 0 ? toDos : allToDos}
                                // onSortEnd={({ oldIndex, newIndex }) => {
                                //     setToDos(toDos, oldIndex, newIndex);
                                // }}
                                onMarkAsStart={async (data) => {
                                    const res = await putDataAPI(`v2/todos/${data.id}`, {
                                        ...data,
                                        labels: JSON.stringify(data.labels.map((label) => label.id)),
                                        users: [],
                                    });
                                    if (res.status) {
                                        setCallback(!callback);
                                    }
                                }}
                                onTodoSelect={(todo) => {
                                    let conversationList = getToDoConversation(todo.id);
                                    if (conversationList) {
                                        conversationList = conversationList.conversationData;
                                    } else {
                                        conversationList = [];
                                    }
                                    setCurrentTodo(todo);
                                    setLoader(true);
                                    setConversation(conversationList);

                                    setTimeout(() => {
                                        setLoader(false);
                                    }, 1500);
                                }}
                                onTodoChecked={(data) => {
                                    data.selected = !data.selected;
                                    let selectedToDos = 0;
                                    const toDos = allToDos.map((todo) => {
                                        if (todo.selected) {
                                            selectedToDos++;
                                        }
                                        if (todo.id === data.id) {
                                            if (todo.selected) {
                                                selectedToDos++;
                                            }
                                            return data;
                                        } else {
                                            return todo;
                                        }
                                    });
                                    setSelectedToDos(selectedToDos);
                                    setAllToDos(toDos);
                                }}
                                useDragHandle={true}
                            />
                        ) : (
                            <ToDoDetail
                                todo={currentTodo}
                                user={user}
                                conversation={conversation}
                                onLabelUpdate={(data, label) => {
                                    if (data.labels.includes(label.id)) {
                                        data.labels = removeLabel(data, label.id);
                                    } else {
                                        data.labels = addLabel(data, label.id);
                                    }
                                    handleRequestClose();
                                    const toDos = allToDos.map((todo) => {
                                        if (todo.id === data.id) {
                                            return data;
                                        } else {
                                            return todo;
                                        }
                                    });

                                    setAlertMessage('To Do Updated Successfully');
                                    setShowMessage(true);
                                    setToDos(toDos);
                                    setCurrentTodo(data);
                                }}
                                onToDoUpdate={(data) => {
                                    handleRequestClose();
                                    const toDos = allToDos.map((todo) => {
                                        if (todo.id === data.id) {
                                            return data;
                                        } else {
                                            return todo;
                                        }
                                    });
                                    setAlertMessage('To Do Updated Successfully');
                                    setShowMessage(true);
                                    setToDos(toDos);
                                    setCurrentTodo(data);
                                }}
                                onDeleteToDo={(data) => {
                                    let selectedToDos = 0;
                                    const toDos = allToDos.map((todo) => {
                                        if (todo.selected) {
                                            selectedToDos++;
                                        }
                                        if (data.id === todo.id) {
                                            if (todo.selected) {
                                                selectedToDos--;
                                            }
                                            return { ...todo, deleted: true };
                                        } else {
                                            return todo;
                                        }
                                    });
                                    setAlertMessage('To Do Updated Successfully');
                                    setShowMessage(true);
                                    setToDos(toDos.filter((todo) => !todo.deleted));
                                    setCurrentTodo(null);
                                    setSelectedToDos(selectedToDos);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            {showMessage && msgAntd.info(<span id="message-id">{alertMessage}</span>, 3, handleRequestClose())}
        </div>
    );
};

export default TodoPage;
