import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { colorMainClassname, colorThemeBackgroundText } from './pages/utils';
import { testAxios } from '../actions';
import InputCustom from './pages/forms/InputCustom';
import forums from '../apis/forums';

const AddUser = (props) => {
    const navigate = useNavigate();

    const { seto, accounts } = useSelector((state) => ({
        seto: state.seto,
        accounts: state.accounts,
    }));

    const dispatch = useDispatch();
    const reduxAddAccount = (id, name, department, studentId, gender, email, pw) =>
        dispatch(testAxios() /*createAccount(id, name, email, pw)*/);

    // REDUX AREA

    // let ref = useRef([]);
    let loadingRef = useRef();

    const [focus, setFocus] = useState(false);
    const [form, setForm] = useState({
        id: '',
        realname: '',
        studentId: '',
        department: '',
        gender: 'male',
        email: '',
        pw: '',
        confirmPw: '',
    });

    const [err, setErr] = useState({
        id: 0,
        realname: 0,
        studentId: 0,
        department: 0,
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
        // console.log(e.target.name, e.target.value);
    };

    const funcOnSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        // const { id, realname, department, studentId, email, pw, confirmPw } = e.target;

        // const list = { id, realname, department, studentId, email, pw, confirmPw };

        setAllFine((state) => 0);

        Object.keys(form).forEach((item) => {
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
        console.log(`allFine changed : ${allFine}`);
        if (allFine >= 7) {
            console.log('lets go');
            loadingRef.current.continuousStart();

            let _data = {
                department: 'DIGITAL_SECURITY',
                email: form.email,
                male: form.gender === 'male' ? true : false,
                name: form.realname,
                password: form.pw,
                phoneNumber: '010-0000-0000',
                studentNumber: form.studentId,
                username: form.id,
            };

            console.log(_data);

            forums
                .post('/members/join', _data)
                .then((res) => console.log(res))
                .catch((e) => console.log(e));

            // console.log(res);
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

    const renderSelectElement = () => {
        return (
            <React.Fragment>
                <div className="menu-container__section-form">
                    <select
                        className="menu-container__section-form-input"
                        name="gender"
                        id="gender"
                        style={{ padding: '1rem' }}
                        onChange={(e) => funcOnChange(e)}
                    >
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>

                <div className="menu-container__section-form__error" style={{ height: `${err['gender'] * 2}rem` }}>
                    <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                </div>
            </React.Fragment>
        );
    };

    const inputElements = [
        ['text', '아이디', 'id', '입력란이 비었습니다.'],
        ['text', '이름', 'realname', '입력란이 비었습니다.'],
        ['text', '학과', 'department', '입력란이 비었습니다.'],
        ['text', '학번', 'studentId', '입력란이 비었습니다.'],
        ['select', '성별', 'gender', '입력란이 비었습니다.'],
        ['email', '이메일', 'email', '입력란이 비었습니다.'],
        ['password', '비밀번호', 'pw', '입력란이 비었거나 하위 항목과 일치하지 않습니다'],
        ['password', '비밀번호 확인', 'confirmPw', '입력란이 비었거나 하위 항목과 일치하지 않습니다'],
    ];

    const renderElements = () => {
        return inputElements.map((i, index) => {
            if (i[0] !== 'select') {
                return (
                    <InputCustom
                        key={index}
                        type={i[0]}
                        name={i[2]}
                        value={form[i[2]]}
                        placeholder=" "
                        autoComplete="off"
                        onChange={(e) => funcOnChange(e)}
                        thisName={i[1]}
                        errorValue={err[i[2]]}
                        errorMessage={i[3]}
                    />
                );
            }

            return renderSelectElement();
        });
    };

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
                        {renderElements()}

                        <div style={{ height: '2rem' }}></div>

                        <button className="menu-container__section-form-submit" type="submit"></button>
                    </form>
                </section>

                <div style={{ height: '10rem' }}></div>
            </div>
        </main>
    );
};
export default AddUser;
