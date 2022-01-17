import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    let ref = useRef([]);

    const [focus, setFocus] = useState(false);
    const [form, setForm] = useState({
        id: '',
        pw: '',
    });

    const [err, setErr] = useState({
        id: 0,
        pw: 0,
    });

    const funcOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        // console.log(ref);
    };

    const funcOnSubmit = (e) => {
        e.preventDefault();
        const { id, pw } = e.target;
        if (id.value.length === 0) {
            setErr((state) => {
                return { ...state, id: 1 };
            });
            // console.log('id true');
        } else {
            setErr((state) => {
                return { ...state, id: 0 };
            });
            // console.log('id fff');
        }

        if (pw.value.length === 0) {
            setErr((state) => {
                return { ...state, pw: 1 };
            });
            // console.log('pw true');
        } else {
            setErr((state) => {
                return { ...state, pw: 0 };
            });
            // console.log('pw fff');
        }
    };

    const funcScrollToMe = (e) => {
        console.log(ref);
        switch (e.target.name) {
            case 'id':
                window.scrollTo(0, ref.current[0].scrollIntoView());
                break;
            case 'pw':
                window.scrollTo(0, ref.current[1].scrollIntoView());
                break;
        }
    };

    return (
        <main className="main">
            <div className="menu-container">
                <p className="title">로그인</p>
                <section
                    className="menu-container__section base-bg"
                    style={{ width: 'calc(100% - 10rem)', maxWidth: '48rem', padding: '2rem' }}
                >
                    <form name="login" onSubmit={(e) => funcOnSubmit(e)}>
                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                ref={(el) => (ref.current[0] = el)}
                                type="text"
                                name="id"
                                value={form.id}
                                placeholder=" "
                                autoComplete="off"
                                onFocus={(e) => funcScrollToMe(e)}
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">아이디</p>
                        </div>

                        <div className="menu-container__section-form__error" style={{ height: `${err['id'] * 2}rem` }}>
                            <p>입력란이 비었습니다.</p>
                        </div>

                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                ref={(el) => (ref.current[1] = el)}
                                type="password"
                                name="pw"
                                value={form.pw}
                                placeholder=" "
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">비밀번호</p>
                        </div>

                        <div className="menu-container__section-form__error" style={{ height: `${err['pw'] * 2}rem` }}>
                            <p>입력란이 비었습니다.</p>
                        </div>

                        <div style={{ height: '2rem' }}></div>

                        <button className="menu-container__section-form-submit" type="submit"></button>
                    </form>
                    <Link className="menu-container__section-form-join" to="/join">
                        계정이 없으신가요?
                    </Link>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};

export default Login;
