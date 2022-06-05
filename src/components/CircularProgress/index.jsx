import React from 'react';
import loader from '@/assets/images/loader.gif';
import PropTypes from 'prop-types';
const CircularProgress = ({ className }) => (
    <div className={`${className}`}>
        <img height="90" className="rotate" style={{ borderRadius: '999px' }} src={loader} alt="loader" />
    </div>
);

CircularProgress.propTypes = {
    className: PropTypes.string,
};

export default CircularProgress;
