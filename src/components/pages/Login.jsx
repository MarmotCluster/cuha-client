import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    let ref = useRef([]);

    const [focus, setFocus] = useState(false);
    const [form, setForm] = useState({
        id: '',
        pw: '',
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
    };

    return (
        <div className="main" style={{ fontSize: '2rem' }}>
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
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">아이디</p>
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

                        <div style={{ height: '2rem' }}></div>

                        <button className="menu-container__section-form-submit" type="submit"></button>
                    </form>
                    <Link className="menu-container__section-form-join" to="/join">
                        계정이 없으신가요?
                    </Link>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </div>
    );
};

export default Login;
