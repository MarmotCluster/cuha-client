import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-menu">
                <div className="header-menu__container">
                    <Link to="/" className="header-menu__icon home"></Link>
                    <Link to="/board/free" className="header-menu__icon boards"></Link>
                    <Link to="/login" className="header-menu__profile">
                        <div
                            className="header-menu__profile-target"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no-profile.svg)` }}
                        ></div>
                    </Link>
                    <Link to="/ctf" className="header-menu__icon ctf"></Link>
                    <Link to="/settings" className="header-menu__icon settings"></Link>
                </div>
                {/* <div className="header-menu__right">
                    <div className="header-menu__icon ctf"></div>
                    <div className="header-menu__icon settings"></div>
                </div> */}
            </div>
        </header>
    );
};

export default Header;
