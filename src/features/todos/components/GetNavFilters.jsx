import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import filters from '../data/filters';
console.log('🚀 ~ file: GetNavFilters.jsx ~ line 5 ~ filters', filters);

const GetNavFilters = ({ filterId, setFilter }) => {
    return filters.map((filter, index) => (
        <li
            key={index}
            onClick={() => {
                setFilter(filter);
            }}
        >
            <span className={filter.id === Number(filterId) ? 'gx-link active' : 'gx-link'}>
                <i className={`icon icon-${filter.icon}`} />
                <span>{filter.title}</span>
            </span>
        </li>
    ));
};

GetNavFilters.propTypes = {
    filterId: PropTypes.any,
    setFilter: PropTypes.func,
};

export default GetNavFilters;
