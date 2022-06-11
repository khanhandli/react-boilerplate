import React from 'react';

const GetNavLabels = ({ labels, setFilter, filterId }) => {
    return labels.map((label, index) => (
        <li
            key={index}
            onClick={() => {
                setFilter(label);
            }}
        >
            <span className={label.id === Number(filterId) ? 'gx-link active' : 'gx-link'}>
                <i className={`icon icon-circle gx-text-${label.color}`} />
                <span>{label.title}</span>
            </span>
        </li>
    ));
};

export default GetNavLabels;
