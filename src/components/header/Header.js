import React from 'react';

const Header = props => {
    return (
        <div>
            <img src={process.env.REACT_APP_HEADER_IMG_SRC} alt='logo' className="w-2/3 lg:w-1/3"/>
        </div>
    );
};

export default Header;