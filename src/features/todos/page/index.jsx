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
import todoConversation from '../data/todoConversation';
import {
    getAllTodo,
    getImportantToDo,
    getStarredToDo,
    getUnimportantToDo,
    getUnselectedAllTodo,
    getUnStarredTodo,
} from '../handles';
import useDebounce from '../../../hooks/useDeboune';
import ModalAdd from '../components/ModalAdd';

const ITEM_HEIGHT = 34;

const TodoPage = () => {
    const [drawerState, setDrawerState] = React.useState(false);
    const [filter, setFilter] = React.useState('-1');
    const [allToDos, setAllToDos] = React.useState([]);
    const [labels, setLabels] = React.useState([]);
    const [searchTodo, setSearchTodo] = React.useState('');
    const [toDos, setToDos] = React.useState([]);

    const [currentTodo, setCurrentTodo] = React.useState(null);
    const [selectedToDos, setSelectedToDos] = React.useState(0);

    const [optionName, setOptionName] = React.useState('Không chọn');
    const [showMessage, setShowMessage] = React.useState(false);
    const [addTodo, setAddTodo] = React.useState(false);
    const [labelMenuState, setLabelMenuState] = React.useState(false);
    const [optionMenuState, setOptionMenuState] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [itemSelected, setItemSelected] = React.useState(null);

    const [conversation, setConversation] = React.useState([]);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [user, setUser] = React.useState({
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://via.placeholder.com/150x150',
    });

    const [callback, setCallback] = React.useState(false);
    const debouncedSearchTerm = useDebounce(searchTodo, 500);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);

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
        setItemSelected(null);
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

    const onLabelMenuItemSelect = async (e) => {
        const labelId = +e.key;

        if (!itemSelected) {
            msgAntd.error('Vui lòng chọn 1 công việc.');
            return;
        }

        if (itemSelected.labels.some((lb) => lb.id === labelId)) {
            msgAntd.error('Công việc đã có nhãn này!');
            return;
        }

        await putDataAPI(`v2/todos/${itemSelected.id}`, {
            labels: JSON.stringify([...itemSelected.labels.map((item) => item.id), labelId]),
        });
        msgAntd.success('Cập nhật nhãn thành công!');
        setCallback(!callback);
        setSelectedToDos(0);
    };

    const labelMenu = () => {
        const items = labels.map((label) => ({ label: label.title, key: label.id }));
        return <Menu onClick={onLabelMenuItemSelect} items={items} />;
    };

    function getToDoConversation(id) {
        return todoConversation.find((conversation) => conversation.id === id);
    }

    const getLabels = React.useCallback(async () => {
        const res = await getDataAPI('v2/labels');
        if (res.status === 200) {
            setLabels(res.data);
        }
    }, []);
    React.useEffect(() => {
        getLabels();
    }, []);

    const getTodos = React.useCallback(async () => {
        const res = await getDataAPI(
            `v2/todos?page=1&title=${debouncedSearchTerm}&size=10&${
                filter.id
                    ? 'filter=' + (typeof Number(filter) == 'number' ? filter.id.toString() : [filter?.handle])
                    : ''
            }`
        );
        if (res.status === 200) {
            setAllToDos(res.data.list_todo);
            if (currentTodo?.id) {
                setCurrentTodo((prev) => res.data.list_todo.find((todo) => todo.id == prev.id));
            }
        }
    }, [filter, debouncedSearchTerm, currentTodo?.id]);

    React.useEffect(() => {
        getTodos();
    }, [filter, callback, debouncedSearchTerm]);

    React.useEffect(() => {
        setLoader(true);

        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);

    return (
        <div className="gx-main-content">
            <div className="gx-app-module">
                <div className="gx-d-block gx-d-lg-none">
                    <Drawer placement="left" closable={false} visible={drawerState} onClose={onToggleDrawer}>
                        <ToDoSideBar
                            setOpenModalAdd={setOpenModalAdd}
                            filter={filter}
                            setFilter={setFilter}
                            labels={labels}
                        />
                    </Drawer>
                </div>
                <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
                    <ToDoSideBar
                        setOpenModalAdd={setOpenModalAdd}
                        filter={filter}
                        setFilter={setFilter}
                        labels={labels}
                    />
                </div>

                <div className="gx-module-box">
                    <div className="gx-module-box-header">
                        <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                            <i className="icon icon-menu gx-icon-btn" aria-label="Menu" onClick={onToggleDrawer} />
                        </span>
                        <AppModuleHeader
                            disabled={currentTodo}
                            placeholder="Nhập tên công việc"
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

                                {itemSelected && selectedToDos > 0 && (
                                    <Dropdown overlay={labelMenu} placement="bottomRight">
                                        <i className="gx-icon-btn icon icon-tag" />
                                    </Dropdown>
                                )}
                            </div>
                        ) : (
                            <div className="gx-module-box-topbar">
                                <i className="icon icon-arrow-left gx-icon-btn" onClick={() => setCurrentTodo(null)} />
                                {currentTodo?.title}
                            </div>
                        )}
                        {loader ? (
                            <div className="gx-loader-view">
                                <CircularProgress />
                            </div>
                        ) : currentTodo === null ? (
                            <ToDoList
                                onDeleteLabel={async (labels, idTodo) => {
                                    const res = await putDataAPI(`v2/todos/${idTodo}`, {
                                        labels: JSON.stringify(labels.map((label) => label.id)),
                                    });
                                    if (res.status) {
                                        setCallback(!callback);
                                    }
                                }}
                                allToDos={toDos && toDos.length > 0 ? toDos : allToDos}
                                // onSortEnd={({ oldIndex, newIndex }) => {
                                //     setToDos(toDos, oldIndex, newIndex);
                                // }}
                                onMarkAsStart={async (data) => {
                                    const res = await putDataAPI(`v2/todos/${data.id}`, {
                                        starred: data?.starred,
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
                                    if (data.selected && !allToDos.every((todo) => todo.selected)) {
                                        setItemSelected(data);
                                    } else {
                                        setItemSelected(null);
                                    }
                                    setSelectedToDos(selectedToDos);
                                    setAllToDos(toDos);
                                }}
                                useDragHandle={true}
                            />
                        ) : (
                            <ToDoDetail
                                todo={currentTodo}
                                user={user}
                                labels={labels}
                                callback={callback}
                                setCallback={setCallback}
                                conversation={conversation}
                            />
                        )}
                    </div>
                </div>
            </div>
            <ModalAdd
                open={openModalAdd}
                setOpenModalAdd={setOpenModalAdd}
                callback={callback}
                setCallback={setCallback}
                labels={labels}
            />
        </div>
    );
};

export default TodoPage;
