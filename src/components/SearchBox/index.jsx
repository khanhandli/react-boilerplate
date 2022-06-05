import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ styleName, placeholder, onChange, value }) => {
    return (
        <div style={{ flex: 1 }} className={`gx-search-bar ${styleName}`}>
            <div className="gx-form-group">
                <input
                    className="ant-input"
                    type="search"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                <span className="gx-search-icon gx-pointer">
                    <i className="icon icon-search" />
                </span>
            </div>
        </div>
    );
};

SearchBox.propTypes = {
    styleName: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default SearchBox;
