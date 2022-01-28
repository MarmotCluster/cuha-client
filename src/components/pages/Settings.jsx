import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finalSet } from '../../reducers/settingsReducer';

import {
    colorMainClassname,
    colorThemeBackgroundText,
    colorThemeContainer,
    colorThemeContainerActiveText,
    colorThemeContainerText,
} from './utils';

const Settings = (props) => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    const dispatch = useDispatch();
    const reduxSetoOnSelect = (param) => dispatch(finalSet(param));

    const [isCookieLoaded, setIsCookieLoaded] = useState(false);

    const [settings, setSettings] = useState(seto);

    const init = () => {
        setSettings((state) => seto);

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
        // setCookie('settings', settings, {});
        reduxSetoOnSelect(settings);
        // console.log('cookie updated with useEffect');
    }, [settings]);

    const renderSectionTheme = () => {
        if (isCookieLoaded) {
            return (
                <React.Fragment>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title menu-container__section-item__title-static">
                            <span style={{ color: colorThemeBackgroundText[seto.theme] }}>테마</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: colorThemeContainerActiveText[seto.theme] }}>
                                기본 테마
                            </span>
                        </p>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>기본 테마</span>
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
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>다크 테마</span>
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
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>핑크 테마</span>
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

    const renderSectionLanguage = () => {
        if (isCookieLoaded) {
            return (
                <React.Fragment>
                    <div className="menu-container__section-item">
                        <p
                            className={
                                settings.language !== 1
                                    ? 'en menu-container__section-item__title menu-container__section-item__title-static'
                                    : 'menu-container__section-item__title menu-container__section-item__title-static'
                            }
                        >
                            <span style={{ color: colorThemeBackgroundText[seto.theme] }}>언어</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: colorThemeContainerActiveText[seto.theme] }}>
                                {getCurrentSettingsValue('language')}
                            </span>
                        </p>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>English</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.language === 0 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('language', 0)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title">
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>한국어</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.language === 1 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('language', 1)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                    <div className="menu-container__section-item">
                        <p className="en menu-container__section-item__title">
                            <span style={{ color: colorThemeContainerText[seto.theme] }}>中文 (简体)</span>
                        </p>
                        <div
                            className="menu-container__section-item__active"
                            style={{ backgroundColor: settings.language === 2 ? 'skyblue' : 'transparent' }}
                        ></div>
                        <button
                            onClick={() => saveData('language', 2)}
                            className="menu-container__section-item__title-btn"
                        ></button>
                    </div>
                </React.Fragment>
            );
        }
    };

    const getCurrentSettingsValue = (kind) => {
        if (kind === 'language') {
            switch (settings.language) {
                case 0:
                    return 'English';
                case 1:
                    return '한국어';
                case 2:
                    return '中文 (简体)';
            }
        }
    };

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div className="menu-container">
                <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                    환경설정
                </p>
                <section
                    className="menu-container__section"
                    style={{ backgroundColor: colorThemeContainer[seto.theme] }}
                >
                    {renderSectionTheme()}
                </section>

                <div style={{ height: '2rem' }}></div>

                <section
                    className="menu-container__section"
                    style={{ backgroundColor: colorThemeContainer[seto.theme] }}
                >
                    {renderSectionLanguage()}
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Settings;
