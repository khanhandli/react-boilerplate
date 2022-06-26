import { Button } from 'antd';
import CustomScrollbars from '@/components/CustomScrollbars';
import React from 'react';
import GetNavFilters from './GetNavFilters';
import GetNavLabels from './GetNavLabels';
import PropTypes from 'prop-types';

const ToDoSideBar = ({ labels, filter, setFilter, setOpenModalAdd }) => {
    return (
        <div className="gx-module-side">
            <div className="gx-module-side-header">
                <div className="gx-module-logo">
                    <i className="icon icon-check-circle-o gx-mr-4" />
                    QL công việc
                </div>
            </div>
            <div className="gx-module-side-content">
                <CustomScrollbars className="gx-module-side-scroll">
                    <div className="gx-module-add-task">
                        <Button
                            variant="raised"
                            type="primary"
                            className="gx-btn-block"
                            onClick={() => setOpenModalAdd(true)}
                        >
                            Thêm công việc
                        </Button>
                    </div>
                    <ul className="gx-module-nav">
                        <li
                            onClick={() => {
                                setFilter('');
                            }}
                        >
                            <span className="gx-link active">
                                <i className="icon icon-all-contacts" />
                                <span>Tất cả</span>
                            </span>
                        </li>

                        <li className="gx-module-nav-label">Lọc</li>

                        <GetNavFilters setFilter={setFilter} filterId={filter} />

                        <li className="gx-module-nav-label">Nhãn</li>
                        <GetNavLabels setFilter={setFilter} filterId={filter} labels={labels} />
                    </ul>
                </CustomScrollbars>
            </div>
        </div>
    );
};

ToDoSideBar.propTypes = {};

export default React.memo(ToDoSideBar);
