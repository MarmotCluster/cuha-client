import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import LoadingBar from 'react-top-loading-bar';

import { fetchAccount, logoutAccount } from '../../actions';
import { colorMainClassname, colorThemeBackgroundText, colorMainRecentPostItemText } from './utils';
import InputCustom from './forms/InputCustom';
import forums from '../../apis/forums';

export const translated = {
  title: ['Login', '로그인', '登录'],
  section: {
    id: {
      placeholder: ['USERNAME', '아이디', '用户名'],
      errorDescription: ['The Field above is empty.', '입력란이 비었습니다.', '上面的字段是空的。'],
    },
    password: {
      placeholder: ['PASSWORD', '비밀번호', '密码'],
      errorDescription: ['The Field above is empty.', '입력란이 비었습니다.', '上面的字段是空的。'],
    },

    register: ['Have no account?', '계정이 없으신가요?', '对我们来说是新的？'],
  },
};

const Login = () => {
  const { seto, accounts } = useSelector((state) => ({
    seto: state.seto,
    accounts: state.accounts,
  }));

  const dispatch = useDispatch();
  const reduxSignInSucceed = (res) => dispatch(fetchAccount(res));
  const reduxLogoutAccount = () => dispatch(logoutAccount());

  // REDUX AREA

  const navigate = useNavigate();

  let ref = useRef([]);
  let loadingRef = useRef();

  const [lastSubmitResponse, setLastSubmitResponse] = useState('');
  const [form, setForm] = useState({
    id: '',
    pw: '',
  });

  const [status400msg, setStatus400msg] = useState('');

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
      // console.log(form.id, form.pw);
      loadingRef.current.continuousStart();
      //   reduxTrySignIn(id.value, pw.value);
      let tryLogin = async () => {
        try {
          const res = await forums.post(
            `/members/login`,
            JSON.stringify({
              username: form.id,
              password: form.pw,
            })
          );

          reduxSignInSucceed(res);
        } catch (ex) {
          console.log(ex.response);

          if (ex.response) {
            let { message } = ex.response.data;
            if (message) setStatus400msg(message);
          } else {
            console.log('알 수 없는 오류 발생');
          }
        }
      };

      tryLogin();
      loadingRef.current.complete();
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

  const tempLogOut = () => {
    reduxLogoutAccount();
  };

  useEffect(() => {
    // console.log(accounts.recentCallResponse);
    // setLastSubmitResponse(accounts.recentCallResponse);
    if (accounts.recentCallResponse === 'LOGIN_SUCCEED') {
      // console.log(accounts.fromToken);
      navigate(`/member/${accounts.fromToken.username}`);
    }
  }, [accounts.recentCallResponse]);

  if (accounts.isSignedIn) {
    return (
      <main className="main" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="menu-container">
          <p className="title">내 정보</p>
          <p style={{ fontSize: '1.4rem' }}>{jwtDecode(accounts.userAccessToken).name}</p>

          <div style={{ height: '10rem' }}></div>
          <button onClick={() => tempLogOut()}>로그아웃</button>
        </div>
      </main>
    );
  } else {
    return (
      <main className={colorMainClassname[seto.theme]}>
        <LoadingBar color="#0a33cc" ref={loadingRef} />

        <div className="menu-container">
          <p className="title" style={{ color: colorThemeBackgroundText[seto.theme] }}>
            <span className={seto.language === 1 ? '' : 'en'}>{translated.title[seto.language]}</span>
          </p>
          <section className="menu-container__section" style={{ width: 'calc(100% - 10rem)', maxWidth: '48rem', padding: '2rem' }}>
            {status400msg !== '' ? (
              <div className="menu-container__section-submitstatus" style={{ fontSize: '1.4rem' }}>
                <span>{status400msg}</span>
              </div>
            ) : null}
            <form name="login" onSubmit={(e) => funcOnSubmit(e)}>
              <InputCustom
                ref={(el) => (ref.current[0] = el)}
                type="text"
                name="id"
                value={form.id}
                placeholder=" "
                autoComplete="off"
                onChange={(e) => funcOnChange(e)}
                thisName={translated.section.id.placeholder[seto.language]}
                errorValue={err.id}
                errorMessage={translated.section.id.errorDescription[seto.language]}
              />

              <InputCustom
                ref={(el) => (ref.current[1] = el)}
                type="password"
                name="pw"
                value={form.pw}
                placeholder=" "
                autoComplete="off"
                onChange={(e) => funcOnChange(e)}
                thisName={translated.section.password.placeholder[seto.language]}
                errorValue={err.pw}
                errorMessage={translated.section.password.errorDescription[seto.language]}
              />

              <button className="menu-container__section-form-submit" type="submit"></button>
            </form>
            <Link className="menu-container__section-form-join" to="/join" style={{ color: colorMainRecentPostItemText[seto.theme] }}>
              <span className={seto.language === 1 ? '' : 'en'}>{translated.section.register[seto.language]}</span>
            </Link>
          </section>

          <div style={{ height: '10rem' }}></div>
        </div>
      </main>
    );
  }
};

export default Login;
