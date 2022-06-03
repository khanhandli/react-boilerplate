import { Link } from "react-router-dom";

const AppLink = ({ href, children, className }) => {
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

export default AppLink;
