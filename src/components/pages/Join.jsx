import React, { useState } from 'react';
import history from '../../history';

const Join = () => {
    // const funcOnSubmit = (e) => {
    //     e.preventDefault();
    // };

    // const [form, setForm] = useState({
    //     id: '',
    //     pw: '',
    // });

    // const [err, setErr] = useState({
    //     id: 0,
    //     pw: 0,
    // });

    // const funcOnChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    //     // console.log(ref);
    // };

    // return (
    //     <main className="main" style={{ backgroundColor: '#f4f4f4' }}>
    //         <div className="menu-container">
    //             <p className="title">로그인</p>
    //             <section
    //                 className="menu-container__section"
    //                 style={{ width: 'calc(100% - 10rem)', maxWidth: '48rem', padding: '2rem' }}
    //             >
    //                 <form name="login" onSubmit={(e) => funcOnSubmit(e)}>
    //                     <div className="menu-container__section-form">
    //                         <input
    //                             className="menu-container__section-form-input"
    //                             type="text"
    //                             name="id"
    //                             value={form.id}
    //                             placeholder=" "
    //                             autoComplete="off"
    //                             // onFocus={(e) => funcScrollToMe(e)}
    //                             onChange={(e) => funcOnChange(e)}
    //                         />
    //                         <p className="menu-container__section-form-title">아이디</p>
    //                     </div>

    //                     <div className="menu-container__section-form__error" style={{ height: `${err['id'] * 2}rem` }}>
    //                         <p>입력란이 비었습니다.</p>
    //                     </div>

    //                     <div className="menu-container__section-form">
    //                         <input
    //                             className="menu-container__section-form-input"
    //                             type="password"
    //                             name="pw"
    //                             value={form.pw}
    //                             placeholder=" "
    //                             onChange={(e) => funcOnChange(e)}
    //                         />
    //                         <p className="menu-container__section-form-title">비밀번호</p>
    //                     </div>

    //                     <div className="menu-container__section-form__error" style={{ height: `${err['pw'] * 2}rem` }}>
    //                         <p>입력란이 비었습니다.</p>
    //                     </div>

    //                     <div style={{ height: '2rem' }}></div>

    //                     <button className="menu-container__section-form-submit" type="submit"></button>
    //                 </form>
    //                 {/* <Link className="menu-container__section-form-join" to="/join">
    //                     계정이 없으신가요?
    //                 </Link> */}
    //             </section>

    //             <div style={{ height: '10rem' }}></div>
    //         </div>
    //     </main>
    // );

    return (
        <main className="main" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="menu-container">
                <p className="title">회원가입</p>
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
                    <p>
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
