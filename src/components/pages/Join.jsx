import React from 'react';
import history from '../../history';

const Join = () => {
    return (
        <main className="main">
            <div className="menu-container">
                <p className="title">회원가입</p>
                <section className="menu-container__section" style={{ width: 'calc(100% - 6rem)', maxWidth: '48rem', padding: '2rem' }}>
                    <p style={{ fontSize: '1.4rem', textAlign: 'center' }}>
                        우리 웹사이트는 회원가입을 지원하지 않습니다.
                        <br />
                        계정 생성을 원하시면 CUHA 관리자에게 문의바랍니다.
                    </p>

                    <button className="menu-container__section-join-goback base-bg" onClick={() => history.back()}>
                        돌아가기
                    </button>
                </section>
            </div>
        </main>
    );
};

export default Join;
