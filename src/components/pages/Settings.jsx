import React from 'react';
import { setCookie, getCookie } from '../cookies';

const Settings = (props) => {
    return (
        <main className="main">
            <div className="menu-settings">
                <p className="title">환경설정</p>
                <section className="menu-settings__section base-bg">
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title menu-settings__section-item__title-static">
                            <span>테마</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: 'darkblue' }}>기본 테마</span>
                        </p>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title">
                            <span>기본 테마</span>
                        </p>
                        <div className="menu-settings__section-item__active" style={{ backgroundColor: 'white' }}></div>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title">
                            <span>다크 테마</span>
                        </p>
                        <div className="menu-settings__section-item__active"></div>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title">
                            <span>핑크 테마</span>
                        </p>
                        <div className="menu-settings__section-item__active"></div>
                    </div>
                </section>

                <div style={{ height: '2rem' }}></div>

                <section className="menu-settings__section base-bg">
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title menu-settings__section-item__title-static">
                            <span>언어</span>
                            <br />
                            <span style={{ fontSize: '1.2rem', color: 'darkblue' }}>한국어</span>
                        </p>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="en menu-settings__section-item__title">
                            <span>English</span>
                        </p>
                        <div className="menu-settings__section-item__active"></div>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="menu-settings__section-item__title">
                            <span>한국어</span>
                        </p>
                        <div className="menu-settings__section-item__active" style={{ backgroundColor: 'white' }}></div>
                    </div>
                    <div className="menu-settings__section-item">
                        <p className="en menu-settings__section-item__title">
                            <span>中文 (简体)</span>
                        </p>
                        <div className="menu-settings__section-item__active"></div>
                    </div>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Settings;
