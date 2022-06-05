import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppLink = ({ href, children, className }) => {
    return (
        <Link to={href} className={className}>
            {children}
        </Link>
    );
};

AppLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default AppLink;
