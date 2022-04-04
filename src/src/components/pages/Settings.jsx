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

export const translated = {
    title: ['Settings', '환경설정', '喜好'],
    section: {
        theme: {
            name: ['Theme', '테마', '主题'],
            list: [
                ['Default', 'Dark', 'Pink'],
                ['기본', '다크', '핑크'],
                ['默认', '黑暗的', '粉色的'],
            ],
        },
    },

    global: {
        section: {
            lang: {
                list: ['English', '한국어', '中文 (简体)'],
            },
        },
    },
};

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
                            <span
                                style={{ color: colorThemeBackgroundText[seto.theme] }}
                                className={seto.language === 1 ? '' : 'en'}
                            >
                                {translated.section.theme.name[seto.language]}
                            </span>
                            <br />
                            <span
                                style={{ fontSize: '1.2rem', color: colorThemeContainerActiveText[seto.theme] }}
                                className={seto.language === 1 ? '' : 'en'}
                            >
                                {translated.section.theme.list[seto.language][seto.theme]}
                            </span>
                        </p>
                    </div>

                    {translated.section.theme.list[0].map((i, index) => {
                        return (
                            <div className="menu-container__section-item" key={index}>
                                <p className="menu-container__section-item__title">
                                    <span
                                        style={{ color: colorThemeContainerText[seto.theme] }}
                                        className={seto.language === 1 ? '' : 'en'}
                                    >
                                        {translated.section.theme.list[seto.language][index]}
                                    </span>
                                </p>
                                <div
                                    className="menu-container__section-item__active"
                                    style={{ backgroundColor: settings.theme === index ? 'skyblue' : 'transparent' }}
                                ></div>
                                <button
                                    onClick={() => saveData('theme', index)}
                                    className="menu-container__section-item__title-btn"
                                ></button>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }
    };

    const renderSectionLanguage = () => {
        if (isCookieLoaded) {
            return (
                <React.Fragment>
                    <div className="menu-container__section-item">
                        <p className="menu-container__section-item__title menu-container__section-item__title-static">
                            <span
                                style={{ color: colorThemeBackgroundText[seto.theme] }}
                                className={seto.language === 1 ? '' : 'en'}
                            >
                                {translated.title[seto.language]}
                            </span>
                            <br />
                            <span
                                style={{ fontSize: '1.2rem', color: colorThemeContainerActiveText[seto.theme] }}
                                className={seto.language === 1 ? '' : 'en'}
                            >
                                {getCurrentSettingsValue('language')}
                            </span>
                        </p>
                    </div>

                    {translated.section.theme.list[0].map((i, index) => {
                        return (
                            <div className="menu-container__section-item" key={index}>
                                <p className="menu-container__section-item__title">
                                    <span
                                        style={{ color: colorThemeContainerText[seto.theme] }}
                                        className={index === 1 ? '' : 'en'}
                                    >
                                        {translated.global.section.lang.list[index]}
                                    </span>
                                </p>
                                <div
                                    className="menu-container__section-item__active"
                                    style={{ backgroundColor: settings.language === index ? 'skyblue' : 'transparent' }}
                                ></div>
                                <button
                                    onClick={() => saveData('language', index)}
                                    className="menu-container__section-item__title-btn"
                                ></button>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }
    };

    const getCurrentSettingsValue = (kind) => {
        if (kind === 'language') {
            // switch (settings.language) {
            //     case 0:
            //         return 'English';
            //     case 1:
            //         return '한국어';
            //     case 2:
            //         return '中文 (简体)';
            // }
            return translated.global.section.lang.list[settings.language];
        }
    };

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div className="menu-container">
                <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                    <span className={seto.language === 1 ? '' : 'en'}>{translated.title[seto.language]}</span>
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
