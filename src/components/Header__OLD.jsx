import React from 'react';
const Header = () => {
    return (
        <header className="header">
            <a href="#">
                <div className="header-logo"></div>
            </a>
            <div className="header-menu">
                <div className="header-menu__left">
                    <div className="header-menu__icon home"></div>
                    <div className="header-menu__icon boards"></div>
                </div>
                <div className="header-menu__right">
                    <div className="header-menu__icon ctf"></div>
                    <div className="header-menu__icon settings"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
