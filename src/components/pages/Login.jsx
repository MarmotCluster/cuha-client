import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

import { fetchAccount } from '../../actions';
import { colorMainClassname, colorThemeBackgroundText } from './utils';

const Login = () => {
    const { seto, accounts } = useSelector((state) => ({
        seto: state.seto,
        accounts: state.accounts,
    }));

    const dispatch = useDispatch();
    const reduxCheckAccount = (id, pw) => dispatch(fetchAccount(id, pw));

    // REDUX AREA

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

        if (id.value.length !== 0 && pw.value.length !== 0) {
            reduxCheckAccount(id.value, pw.value);
        }
    };

    const funcScrollToMe = (e) => {
        // console.log(ref);
        switch (e.target.name) {
            case 'id':
                window.scrollTo(0, ref.current[0].scrollIntoView());
                break;
            case 'pw':
                window.scrollTo(0, ref.current[1].scrollIntoView());
                break;
        }
    };

    useEffect(() => {
        console.log(accounts);
    }, [accounts]);

    if (accounts.isSignedIn) {
        return (
            <main className="main" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="menu-container">
                    <p className="title">내 정보</p>
                    <p style={{ fontSize: '1.4rem' }}>{jwtDecode(accounts.userAccessToken).name}</p>

                    <div style={{ height: '10rem' }}></div>
                </div>
            </main>
        );
    } else {
        return (
            <main className={colorMainClassname[seto.theme]}>
                <div className="menu-container">
                    <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                        로그인
                    </p>
                    <section
                        className="menu-container__section"
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

                            <div
                                className="menu-container__section-form__error"
                                style={{ height: `${err['id'] * 2}rem` }}
                            >
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

                            <div
                                className="menu-container__section-form__error"
                                style={{ height: `${err['pw'] * 2}rem` }}
                            >
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
    }
};

export default Login;
