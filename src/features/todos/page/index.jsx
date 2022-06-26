import { getDataAPI, putDataAPI } from '@/apis';
import AppModuleHeader from '@/components/AppModuleHeader';
import Auxiliary from '@/components/Auxiliary';
import CircularProgress from '@/components/CircularProgress';
import { Checkbox, Drawer, Dropdown, Menu, message as msgAntd } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '../../../hooks/useDeboune';
import ModalAdd from '../components/ModalAdd';
import ToDoDetail from '../components/Todo/ToDoDetail';
import ToDoList from '../components/Todo/ToDoList';
import ToDoSideBar from '../components/ToDoSideBar';
import options from '../data/options';
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
    const [labels, setLabels] = React.useState([]);
    const [searchTodo, setSearchTodo] = React.useState('');
    const [toDos, setToDos] = React.useState([]);

    const [currentTodo, setCurrentTodo] = React.useState(null);
    const [selectedToDos, setSelectedToDos] = React.useState(0);

    const [optionName, setOptionName] = React.useState('Không chọn');
    const [loader, setLoader] = React.useState(false);

    const [itemSelected, setItemSelected] = React.useState(null);

    const [callback, setCallback] = React.useState(false);
    const debouncedSearchTerm = useDebounce(searchTodo, 500);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);

    const auth = useSelector((state) => state.auth);

    const onToggleDrawer = () => {
        setDrawerState(!drawerState);
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
                getAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
                break;
            case '2':
                getUnselectedAllTodo(allToDos, setToDos, setSelectedToDos, setAllToDos, setOptionName);
                break;
            case '3':
                getStarredToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '4':
                getUnStarredTodo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '5':
                getImportantToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            case '6':
                getUnimportantToDo(allToDos, setToDos, setSelectedToDos, setOptionName);
                break;
            default:
                return '';
        }
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
                filter?.id || filter.id === 0
                    ? filter?.color
                        ? 'label=' + filter.id
                        : 'filter=' + [filter?.handle]
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

    const onTodoChecked = React.useCallback(
        (data) => {
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
        },
        [selectedToDos, allToDos]
    );

    const onTodoSelect = React.useCallback((todo) => {
        setCurrentTodo(todo);
        setLoader(true);

        setTimeout(() => {
            setLoader(false);
        }, 1500);
    }, []);

    const onMarkAsStart = React.useCallback(
        async (data) => {
            const res = await putDataAPI(`v2/todos/${data.id}`, {
                starred: data?.starred,
            });
            if (res.status) {
                setCallback(!callback);
            }
        },
        [callback]
    );

    const onDeleteLabel = React.useCallback(
        async (labels, idTodo) => {
            const res = await putDataAPI(`v2/todos/${idTodo}`, {
                labels: JSON.stringify(labels.map((label) => label.id)),
            });
            if (res.status) {
                setCallback(!callback);
            }
        },
        [callback]
    );

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
                            callback={callback}
                            setCallback={setCallback}
                            setLoader={setLoader}
                            disabled={currentTodo ? true : false}
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
                                onDeleteLabel={(labels, idTodo) => onDeleteLabel(labels, idTodo)}
                                allToDos={toDos && toDos.length > 0 ? toDos : allToDos}
                                onMarkAsStart={(data) => onMarkAsStart(data)}
                                onTodoSelect={(todo) => onTodoSelect(todo)}
                                onTodoChecked={(data) => onTodoChecked(data)}
                                useDragHandle={true}
                            />
                        ) : (
                            <ToDoDetail
                                auth={auth}
                                todo={currentTodo}
                                labels={labels}
                                callback={callback}
                                setCallback={setCallback}
                                setCurrentTodo={setCurrentTodo}
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
