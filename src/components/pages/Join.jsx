import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import { colorMainClassname, colorThemeBackgroundText } from './utils';

const Join = () => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div className="menu-container">
                <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                    회원가입
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
                    <p style={{ color: colorThemeBackgroundText[seto.theme] }}>
                        우리 웹사이트는 회원가입을 지원하지 않습니다.
                        <br />
                        계정 생성을 원하시면 CUHA 관리자에게 문의바랍니다.
                    </p>

                    <div style={{ height: '4rem' }}></div>

                    <a href="mailto:admin@admin.com" style={{ color: '#ccc' }}>
                        관리자에게 연락하기
                    </a>

                    <button className="menu-container__section-join-goback" onClick={() => history.back()}>
                        돌아가기
                    </button>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Join;
