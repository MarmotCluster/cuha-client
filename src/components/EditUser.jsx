import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { colorMainClassname, colorThemeBackgroundText, colorMainRecentPostItemText } from './pages/utils';
import { createAccount, testAxios, updateAccountWithoutPassword } from '../actions';
import InputCustom from './pages/forms/InputCustom';
import history from '../history';
import forums from '../apis/forums';
import AlertPopup from './AlertPopup';

const EditUser = (props) => {
    const navigate = useNavigate();

    const { seto, accounts } = useSelector((state) => ({
        seto: state.seto,
        accounts: state.accounts,
    }));

    const dispatch = useDispatch();
    const reduxAddAccount = (id, name, department, studentNumber, gender, email, profileImage) =>
        dispatch(updateAccountWithoutPassword(id, name, department, studentNumber, gender, email, profileImage));

    // REDUX AREA

    const [isUpdateDone, setIsUpdateDone] = useState(false);

    useEffect(() => {
        if (isUpdateDone) {
            history.back();
        }
    }, [isUpdateDone]);

    let loadingRef = useRef();

    const [newImage, setNewImage] = useState({
        file: '',
        url: '',
    });

    const [profileImage119, setProfileImage119] = useState();

    const onUploadImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        // let formData = new FormData

        reader.onloadend = () => {
            setNewImage((state) => ({
                ...state,
                file: file,
                url: reader.result,
            }));
        };
        console.log(reader, newImage);

        reader.readAsDataURL(file);

        setForm((state) => ({
            ...state,
            profileImage: e.target.files[0].name ? e.target.files[0].name : '변경하지 않음',
        }));

        setProfileImage119((state) => e.target.files[0]);
    };

    const [currentUser, setCurrentUser] = useState({}); // This fills after axios get

    const [focus, setFocus] = useState(false);
    const [form, setForm] = useState({
        id: currentUser.username ? currentUser.username : 'constmyid',
        realname: '',
        studentNumber: '',
        department: 'DIGITAL_SECURITY',
        gender: '',
        email: '',
        // pw: '',
        // confirmPw: '',
        profileImage: '변경하지 않음',
    });

    const [err, setErr] = useState({
        id: 0,
        realname: 0,
        studentNumber: 0,
        department: 0,
        email: 0,
        // pw: 0,
        // confirmPw: 0,
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
        // console.log(form);

        setAllFine((state) => 0);

        Object.keys(form).forEach((item) => {
            // console.log(item, typeof item);

            if (item !== 'profileImage') {
                // if (item !== 'pw' && item !== 'confirmPw') {
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
                // } else {
                //     if (e.target.pw.value === e.target.confirmPw.value && e.target[item].value.length > 0) {
                //         setErr((state) => {
                //             return { ...state, [item]: 0 };
                //         });
                //         setAllFine((state) => state + 1);
                //     } else {
                //         setErr((state) => {
                //             return { ...state, [item]: 1 };
                //         });
                //     }
                // }
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
        if (allFine >= 6) {
            let formData = new FormData();

            const { id, studentNumber, department, gender, email, profileImage } = form;
            console.log('lets go');
            loadingRef.current.continuousStart();

            Object.keys(form).map((i) => {
                if (i !== 'profileImage') {
                    formData.append(i, form[i]);
                } else {
                    formData.append('profileImage', profileImage119);
                }
            });
            formData.append('name', '심형래');
            formData.append('phoneNumber', '010-0000-0000');

            forums({
                method: 'patch',
                url: '/members',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => console.log(res));

            // reduxAddAccount(
            //     id,
            //     realname,
            //     department,
            //     studentNumber,
            //     gender,
            //     email,
            //     profileImage === '변경하지 않음' ? null : profileImage
            // );
            // console.log(res);
            loadingRef.current.complete();

            setIsUpdateDone((state) => true);
        }
    }, [allFine]);

    useEffect(() => {
        forums.get('members').then((res) => {
            console.log(res.data);
            setCurrentUser((state) => res.data);
        });
    }, []);

    const renderSelectElement = (key, targetName) => {
        switch (targetName) {
            case 'gender':
                return (
                    <React.Fragment key={key}>
                        <div className="menu-container__section-form">
                            <select
                                className="menu-container__section-form-input"
                                name="gender"
                                id="gender"
                                style={{ padding: '1rem' }}
                                onChange={(e) => funcOnChange(e)}
                                value={currentUser.male ? 'male' : 'female'}
                            >
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                            </select>
                        </div>

                        <div
                            className="menu-container__section-form__error"
                            style={{ height: `${err['gender'] * 2}rem` }}
                        >
                            <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                        </div>
                    </React.Fragment>
                );

            case 'department':
                return (
                    <React.Fragment key={key}>
                        <div className="menu-container__section-form">
                            <select
                                className="menu-container__section-form-input"
                                name="department"
                                id="department"
                                style={{ padding: '1rem' }}
                                onChange={(e) => funcOnChange(e)}
                            >
                                <optgroup label="소프트웨어융합학부">
                                    <option value="DIGITAL_SECURITY">디지털보안전공</option>
                                    <option value="AI">인공지능전공</option>
                                    <option value="BIG_DATA">빅데이터전공</option>
                                </optgroup>
                            </select>
                        </div>

                        <div
                            className="menu-container__section-form__error"
                            style={{ height: `${err['department'] * 2}rem` }}
                        >
                            <p className={seto.language === 1 ? '' : 'en'}>입력란이 비었습니다.</p>
                        </div>
                    </React.Fragment>
                );
        }
    };

    const inputElements = [
        ['text', '아이디', 'id', '입력란이 비었습니다.', 'username'],
        ['text', '이름', 'realname', '입력란이 비었습니다.', 'name'],
        ['select', '학과', 'department', '입력란이 비었습니다.', 'department'],
        ['text', '학번', 'studentNumber', '입력란이 비었습니다.', 'studentNumber'],
        ['select', '성별', 'gender', '입력란이 비었습니다.', 'male'],
        ['email', '이메일', 'email', '입력란이 비었습니다.', 'email'],
        // ['password', '비밀번호', 'pw', '입력란이 비었거나 하위 항목과 일치하지 않습니다', null],
        // ['password', '비밀번호 확인', 'confirmPw', '입력란이 비었거나 하위 항목과 일치하지 않습니다', null],
    ];

    const renderElements = () => {
        return inputElements.map((i, index) => {
            console.log(form[i[2]]);
            if (i[2] === 'id') {
                return (
                    <InputCustom
                        key={index}
                        type={i[0]}
                        name={i[2]}
                        value={form[i[2]]}
                        placeholder=" "
                        autoComplete="off"
                        onChange={(e) => e.preventDefault()}
                        thisName={i[1]}
                        errorValue={err[i[2]]}
                        errorMessage={i[3]}
                    />
                );
            } else if (i[0] === 'select') {
                return renderSelectElement(index, i[2]);
            } else {
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

            return null;
        });
    };

    const withdrawAccount = () => {
        forums
            .delete('/members')
            .then((res) => {
                console.log(res);
                setIsWidthdrawing((state) => false);
                setIsShownAlert((state) => false);
            })
            .catch((e) => {
                console.log(e);
                setIsWidthdrawing((state) => false);
                setIsShownAlert((state) => false);
            });
    };

    const renderProfileImageUploader = () => {
        return (
            <div
                className="menu-container__section-form"
                style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', flexDirection: 'column' }}
            >
                <div className="menu-container__section-form-file">
                    <div
                        className="menu-container__section-form__preview"
                        style={{
                            backgroundImage: newImage.url
                                ? `url(${newImage.url})`
                                : `url(${process.env.PUBLIC_URL}/images/no-profile.svg)`,
                        }}
                    >
                        <input
                            className="menu-container__section-form__preview-upload"
                            type="file"
                            name="newProfileImage"
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                padding: '0',
                                border: '0',
                                backgroundColor: 'cyan',
                                opacity: '0',
                                cursor: 'pointer',
                            }}
                            accept="image/*"
                            onChange={(e) => onUploadImage(e)}
                        />
                        <div className="menu-container__section-form__preview-uploadHover"></div>
                    </div>
                </div>

                <p style={{ fontSize: '1.4rem', textAlign: 'center', paddingTop: '2rem' }}>{form.profileImage}</p>
            </div>
        );
    };

    const [isShownAlert, setIsShownAlert] = useState(false);

    const [isWithdrawing, setIsWidthdrawing] = useState(false);

    const cancelWithdrawHandler = (e) => {
        // console.log(alertRef.current);

        if (!isWithdrawing) {
            setIsShownAlert((state) => false);
        } else {
            alert('Is on process. Please wait a moment.');
        }
    };

    const confirmWithdrawHandler = () => {
        if (!isWithdrawing) {
            setIsWidthdrawing((state) => true);
            loadingRef.current.continuousStart();
            withdrawAccount();
            loadingRef.current.complete();
        } else {
            alert('Is on process. Please wait a moment.');
        }
    };

    const onMouseDownHandler = (e) => {
        console.log(e);
    };

    return (
        <>
            <AlertPopup
                visible={isShownAlert}
                handlerCancel={() => cancelWithdrawHandler()}
                handlerConfirm={() => confirmWithdrawHandler()}
                onMouseDown={(e) => cancelWithdrawHandler(e)}
                title="계정 탈퇴"
                desc="다시한번 확인을 누르면 탈퇴를 진행합니다."
            />
            <main className={colorMainClassname[seto.theme]}>
                <LoadingBar color="#0a33cc" ref={loadingRef} />

                <div className="menu-container">
                    <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
                        <span className={seto.language === 1 ? '' : 'en'}>내 정보 수정</span>
                    </p>
                    <section
                        className="menu-container__section"
                        style={{ width: 'calc(100% - 10rem)', maxWidth: '48rem', padding: '2rem' }}
                    >
                        <form name="login" onSubmit={(e) => funcOnSubmit(e)}>
                            {renderProfileImageUploader()}

                            {renderElements()}

                            <div style={{ height: '2rem' }}></div>
                            <button
                                className="menu-container__section-form-button-outer"
                                type="button"
                                onClick={() => setIsShownAlert((state) => true)}
                            >
                                계정 탈퇴를 원합니다.
                            </button>

                            <div style={{ height: '2rem' }}></div>

                            <button className="menu-container__section-form-submit" type="submit"></button>
                        </form>
                    </section>

                    <div style={{ height: '10rem' }}></div>
                </div>
            </main>
        </>
    );
};
export default EditUser;
