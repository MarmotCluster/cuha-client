import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import { colorMainClassname, colorThemeBackgroundText } from './utils';

export const translated = {
    title: ['Sign Up', '회원가입', '报名'],
    section: {
        noticify: [
            'Our website does not support Sign Up.</br>Please Contact to our manager to create a new account.',
            '우리 웹사이트는 회원가입을 지원하지 않습니다.</br>계정 생성을 원하시면 CUHA 관리자에게 문의바랍니다.',
            '我们的网站不支持注册。</br>请联系我们的经理创建一个新帐户。',
        ],

        contact: ['Contact to Manager', '관리자에게 연락하기', '联系经理'],
        goback: ['Confirm', '돌아가기', '确认'],
    },
};

const Join = () => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div className="menu-container">
                <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                    <span className={seto.language === 1 ? '' : 'en'}>{translated.title[seto.language]}</span>
                </p>
                <section
                    className="menu-container__section"
                    style={{
                        width: 'calc(100% - 6rem)',
                        maxWidth: '48rem',
                        padding: '2rem',
                        fontSize: '1.4rem',
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{ color: colorThemeBackgroundText[seto.theme] }}
                        className={seto.language === 1 ? '' : 'en'}
                        dangerouslySetInnerHTML={{ __html: translated.section.noticify[seto.language] }}
                    ></p>

                    <div style={{ height: '4rem' }}></div>

                    <a
                        href="mailto:admin@admin.com"
                        style={{ color: '#ccc' }}
                        className={seto.language === 1 ? '' : 'en'}
                    >
                        {translated.section.contact[seto.language]}
                    </a>

                    <button className="menu-container__section-join-goback" onClick={() => history.back()}>
                        <span className={seto.language === 1 ? '' : 'en'}>
                            {translated.section.goback[seto.language]}
                        </span>
                    </button>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Join;
