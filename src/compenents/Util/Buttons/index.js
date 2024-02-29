import { Link } from 'react-router-dom';
import * as React from 'react';
import './index.css';

const ButtonLink = (linkType, linkRoute, linkName) => {
    if (linkType === "navBar") {
        return (


                <Link to={linkRoute} className='nav-link'>{linkName}</Link>

        );
    };
    if (linkType === "mainButton") {
        return(<Link to={linkRoute} className='mainButton'>{linkName}</Link>);
};
};
export default ButtonLink;