import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { colorHeaderClassname } from './pages/utils';

import jwtDecode from 'jwt-decode';

const Header = () => {
    const { seto, accounts } = useSelector((state) => ({
        seto: state.seto,
        accounts: state.accounts,
    }));

    return (
        <header className={colorHeaderClassname[seto.theme]}>
            <div className="header-menu">
                <div className="header-menu__container">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-home-active icon-dark'
                                : 'header-menu__icon icon-home icon-dark'
                        }
                        // className="header-menu__icon icon-home icon-dark"
                        // activeClassName="header-menu__icon icon-home-active icon-dark"
                    ></NavLink>
                    <NavLink
                        to="/board"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-boards-active icon-dark'
                                : 'header-menu__icon icon-boards icon-dark'
                        }
                        // className="header-menu__icon icon-boards icon-dark"
                        // activeClassName="header-menu__icon icon-boards-active icon-dark"
                    ></NavLink>
                    <NavLink
                        to={accounts.isSignedIn ? `/member/${jwtDecode(accounts.userAccessToken).username}` : '/login'}
                        className="header-menu__profile"
                    >
                        <div
                            className="header-menu__profile-target"
                            style={{
                                backgroundImage: accounts.isSignedIn /*&& accounts.profileImageUrl.length > 0*/
                                    ? accounts.profileImageUrl
                                    : `url(${process.env.PUBLIC_URL}/images/no-profile.svg)`,
                                // `url(${process.env.PUBLIC_URL}/images/no-profile.svg)`,
                            }}
                        ></div>
                    </NavLink>
                    <NavLink
                        to="/ctf"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-ctf-active icon-dark'
                                : 'header-menu__icon icon-ctf icon-dark'
                        }
                        // className="header-menu__icon icon-ctf icon-dark"
                        // activeClassName="header-menu__icon icon-ctf-active icon-dark"
                    ></NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive
                                ? 'header-menu__icon icon-settings-active icon-dark'
                                : 'header-menu__icon icon-settings icon-dark'
                        }
                        // className="header-menu__icon icon-settings icon-dark"
                        // activeClassName="header-menu__icon icon-settings-active icon-dark"
                    ></NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
