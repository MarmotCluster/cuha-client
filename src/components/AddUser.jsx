import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { colorMainClassname, colorThemeBackgroundText, colorMainRecentPostItemText } from './pages/utils';
import { createAccount, testAxios } from '../actions';

const AddUser = (props) => {
    const navigate = useNavigate();

    const { seto, accounts } = useSelector((state) => ({
        seto: state.seto,
        accounts: state.accounts,
    }));

    const dispatch = useDispatch();
    const reduxAddAccount = (id, name, email, pw) => dispatch(testAxios() /*createAccount(id, name, email, pw)*/);

    // REDUX AREA

    // let ref = useRef([]);
    let loadingRef = useRef();

    const [focus, setFocus] = useState(false);
    const [form, setForm] = useState({
        id: '',
        realname: '',
        email: '',
        pw: '',
        confirmPw: '',
    });

    const [err, setErr] = useState({
        id: 0,
        realname: 0,
        email: 0,
        pw: 0,
        confirmPw: 0,
    });

    const [allFine, setAllFine] = useState(0);

    const funcOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        // console.log(ref);
    };

    const funcOnSubmit = (e) => {
        e.preventDefault();
        const { id, realname, email, pw, confirmPw } = e.target;

        const list = { id, realname, email, pw, confirmPw };

        setAllFine((state) => 0);

        Object.keys(list).forEach((item) => {
            // console.log(item, typeof item);

            if (item !== 'pw' && item !== 'confirmPw') {
                if (e.target[item].value.length === 0) {
                    setErr((state) => {
                        return { ...state, [item]: 1 };
                    });
                } else {
                    setErr((state) => {
                        return { ...state, [item]: 0 };
                    });
                    setAllFine((state) => state + 1);
                }
            } else {
                if (e.target.pw.value === e.target.confirmPw.value && e.target[item].value.length > 0) {
                    setErr((state) => {
                        return { ...state, [item]: 0 };
                    });
                    setAllFine((state) => state + 1);
                } else {
                    setErr((state) => {
                        return { ...state, [item]: 1 };
                    });
                }
            }
        });

        // if (id.value.length !== 0 && pw.value.length !== 0) {
        //     loadingRef.current.continuousStart();
        //     reduxCheckAccount(id.value, pw.value);
        //     loadingRef.current.complete();
        // }
    };

    useEffect(async () => {
        // console.log(`allFine changed : ${allFine}`);
        if (allFine >= 5) {
            console.log('lets go');
            loadingRef.current.continuousStart();
            const res = await reduxAddAccount();
            console.log(res);
            loadingRef.current.complete();
        }
    }, [allFine]);

    // useEffect(() => {
    //     if (!global.accounts.isAdmin) {
    //         navigate('/');
    //     }
    // }, [global.accounts.isAdmin]);

    // if (global.accounts.isAdmin === true) {
    //     return <main className="main">AddUser</main>;
    // }

    // return <div>{`:(`}</div>;

    return (
        <main className={colorMainClassname[seto.theme]}>
            <LoadingBar color="#0a33cc" ref={loadingRef} />

            <div className="menu-container">
                <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                    <span className={seto.language === 1 ? '' : 'en'}>회원추가</span>
                </p>
                <section
                    className="menu-container__section"
                    style={{ width: 'calc(100% - 10rem)', maxWidth: '48rem', padding: '2rem' }}
                >
                    <form name="login" onSubmit={(e) => funcOnSubmit(e)}>
                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                type="text"
                                name="id"
                                value={form.id}
                                placeholder=" "
                                autoComplete="off"
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">
                                <span className={seto.language === 1 ? '' : 'en'}>아이디</span>
                            </p>
                        </div>

                        <div className="menu-container__section-form__error" style={{ height: `${err['id'] * 2}rem` }}>
                            <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                        </div>

                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                type="text"
                                name="realname"
                                value={form.realname}
                                placeholder=" "
                                autoComplete="off"
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">
                                <span className={seto.language === 1 ? '' : 'en'}>이름</span>
                            </p>
                        </div>

                        <div
                            className="menu-container__section-form__error"
                            style={{ height: `${err['realname'] * 2}rem` }}
                        >
                            <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                        </div>

                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder=" "
                                autoComplete="off"
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">
                                <span className={seto.language === 1 ? '' : 'en'}>이메일</span>
                            </p>
                        </div>

                        <div
                            className="menu-container__section-form__error"
                            style={{ height: `${err['email'] * 2}rem` }}
                        >
                            <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                        </div>

                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                type="password"
                                name="pw"
                                value={form.pw}
                                placeholder=" "
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">
                                <span className={seto.language === 1 ? '' : 'en'}>비밀번호</span>
                            </p>
                        </div>

                        <div className="menu-container__section-form__error" style={{ height: `${err['pw'] * 2}rem` }}>
                            <p className={seto.language === 1 ? '' : 'en'}>
                                입력란이 비었거나 하위 항목과 일치하지 않습니다
                            </p>
                        </div>

                        <div className="menu-container__section-form">
                            <input
                                className="menu-container__section-form-input"
                                type="password"
                                name="confirmPw"
                                value={form.confirmPw}
                                placeholder=" "
                                onChange={(e) => funcOnChange(e)}
                            />
                            <p className="menu-container__section-form-title">
                                <span className={seto.language === 1 ? '' : 'en'}>비밀번호 확인</span>
                            </p>
                        </div>

                        <div
                            className="menu-container__section-form__error"
                            style={{ height: `${err['confirmPw'] * 2}rem` }}
                        >
                            <p className={seto.language === 1 ? '' : 'en'}>
                                입력란이 비었거나 상위 항목과 일치하지 않습니다
                            </p>
                        </div>

                        <div style={{ height: '2rem' }}></div>

                        <button className="menu-container__section-form-submit" type="submit"></button>
                    </form>

                    {/* <Link
                        className="menu-container__section-form-join"
                        to="/join"
                        style={{ color: colorMainRecentPostItemText[seto.theme] }}
                    >
                        <span className={seto.language === 1 ? '' : 'en'}>
                            {translated.section.register[seto.language]}
                        </span>
                    </Link> */}
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};
export default AddUser;
