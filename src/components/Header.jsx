import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-menu">
                <div className="header-menu__container">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-home-active icon-dark'
                                : 'header-menu__icon icon-home icon-dark'
                        }
                    ></NavLink>
                    <NavLink
                        to="/board/free"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-boards-active icon-dark'
                                : 'header-menu__icon icon-boards icon-dark'
                        }
                    ></NavLink>
                    <NavLink to="/login" className="header-menu__profile">
                        <div
                            className="header-menu__profile-target"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no-profile.svg)` }}
                        ></div>
                    </NavLink>
                    <NavLink
                        to="/ctf"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-ctf-active icon-dark'
                                : 'header-menu__icon icon-ctf icon-dark'
                        }
                    ></NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-settings-active icon-dark'
                                : 'header-menu__icon icon-settings icon-dark'
                        }
                    ></NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
