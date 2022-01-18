import React, { useEffect, useState } from 'react';
import { setCookie, getCookie } from '../cookies';

const Settings = (props) => {
    const [isCookieLoaded, setIsCookieLoaded] = useState(false);

    const [settings, setSettings] = useState(getCookie('settings'));

    const init = () => {
        // let savedData = getCookie('settings');
        // console.log(savedData);

        // if (savedData !== undefined) {
        //     setSettings((state) => {
        //         return state;
        //     });
        // }

        console.log(settings);

        if (settings === undefined) {
            setSettings((state) => ({
                ...state,
                theme: 0,
                language: 1,
            }));
        }

        setIsCookieLoaded((o) => true);
    };

    const saveData = (target, to) => {
        setSettings((state) => ({
            ...state,
            [target]: to,
        }));

        // setCookie('settings', settings, {});

        // console.log(settings);
        // console.log(getCookie('settings'));
    };

    useEffect(() => {
        init();
        return null;
    }, []);

    useEffect(() => {
        setCookie('settings', settings, {});
        console.log('cookie updated with useEffect');
    }, [settings]);

    const renderSectionTheme = () => {
        if (isCookieLoaded) {
            return (
                <React.Fragment>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title menu-container__section-item__title-static">
                            <span>테마</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: 'darkblue' }}>기본 테마</span>
                        </p>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span>기본 테마</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.theme === 0 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('theme', 0)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span>다크 테마</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.theme === 1 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('theme', 1)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span>핑크 테마</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.theme === 2 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('theme', 2)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                </React.Fragment>
            );
        }
    };

    return (
        <main className="main">
            <div className="menu-container">
                <p className="title">환경설정</p>
                <section className="menu-container__section base-bg">{renderSectionTheme()}</section>

                <div style={{ height: '2rem' }}></div>

                <section className="menu-container__section base-bg">
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title menu-container__section-item__title-static">
                            <span>언어</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: 'darkblue' }}>한국어</span>
                        </p>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="en menu-container__section-item__title">
                            <span>English</span>
                        </p>
                        <div className="menu-container__section-item__active"></div>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span>한국어</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: 'white' }}
                        ></div>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="en menu-container__section-item__title">
                            <span>中文 (简体)</span>
                        </p>
                        <div className="menu-container__section-item__active"></div>
                    </div>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Settings;
