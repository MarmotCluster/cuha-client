import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import forums from '../../apis/forums';
import { dispatchDismissPw180 } from '../../reducers/accountReducer';
import { getRecalculatedTime } from '../../utils';
import AlertPopup2 from '../AlertPopup2';
import MainItemCard from './feeds/MainItemCard';
import {
  colorMainClassname,
  colorMainFeedBackground,
  colorMainRecentNotice,
  colorMainRecentNoticeSmall,
  colorThemeContainerText,
  colorMainSection,
} from './utils';

export const translated = {
  section: {
    welcome: {
      title: ['CJU Security Circles', '청주대학교 정보보안 동아리', '清州大学安全团体'],
      subtitle: ['프로젝트에 즐거움을, 모두에게 기회를.', '프로젝트에 즐거움을, 모두에게 기회를.', '프로젝트에 즐거움을, 모두에게 기회를.'],
    },

    notices: {
      title: ['Notices', '공지사항', '通知'],
    },

    recents: {
      title: ['Recent Posts', '최신글 모음', '最近的帖子'],
    },
  },
};

const Main = () => {
  const { seto, accounts } = useSelector((state) => ({
    seto: state.seto,
    accounts: state.accounts,
  }));

  const dispatch = useDispatch();

  const closePopupChangePassword = () => dispatch(dispatchDismissPw180());

  // const faker = require('@faker-js/faker');

  const ref = useRef([]);
  const [logo, setLogo] = useState('icon icon-white');
  const [tempDataRemoveThisLater, setTempDataRemoveThisLater] = useState({});
  const [columnCount, setColumnCount] = useState((state) => {
    let val = window.document.documentElement.clientWidth;

    if (val < 500) {
      return 1;
    } else if (val >= 500 && val < 700) {
      return 2;
    } else if (val >= 700 && val < 900) {
      return 3;
    } else {
      return 4;
    }
  });

  useEffect(() => {
    function shouldOriginal() {
      return (
        document.documentElement.scrollTop > ref.current[0].offsetHeight - 20
        // &&
        // document.documentElement.scrollTop < ref.current[1].offsetTop + ref.current[1].offsetHeight - 20
      );
    }

    const funcScrollEvent = (e) => {
      // console.log(
      //     'scrolled',
      //     document.documentElement.scrollTop,
      //     // ref.current[1].offsetHeight,
      //     // ref.current[1].offsetTop
      //     ref.current[1].offsetTop + ref.current[1].offsetHeight - 20
      // );
      if (seto.theme === 0) {
        if (shouldOriginal()) {
          setLogo((state) => 'icon');
        } else {
          setLogo((state) => 'icon icon-white');
        }
      }
    };

    const funcResizeEvent = (e) => {
      let val = window.document.documentElement.clientWidth;

      if (val < 500) {
        setColumnCount((state) => 1);
      } else if (val >= 500 && val < 700) {
        setColumnCount((state) => 2);
      } else if (val >= 700 && val < 900) {
        setColumnCount((state) => 3);
      } else {
        setColumnCount((state) => 4);
      }
    };

    window.addEventListener('scroll', funcScrollEvent);
    window.addEventListener('resize', funcResizeEvent);
    renderTempFromPlaceHolder();

    //

    // alert('비밀번호 변경일로부터 180일을 초과했습니다.');

    return () => {
      window.removeEventListener('scroll', funcScrollEvent);
      window.removeEventListener('resize', funcResizeEvent);
    };
  }, []);

  const renderTempFromPlaceHolder = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // console.log(res.data);

    setTempDataRemoveThisLater((state) => res);
  };

  const renderInnerAlly = (cols) => {
    if (Object.keys(tempDataRemoveThisLater).length > 0) {
      // console.log('렌더시작');

      return tempDataRemoveThisLater.data.map((i, index) => {
        if (index % columnCount === cols) {
          return (
            <MainItemCard
              key={index}
              postId={index}
              image=""
              category={`${Math.round(Math.random())}`}
              title={i.title}
              subtitle={i.body}
              profileImage=""
              uploaderName="Jasmin Pay"
              uploadedDate="2022-02-22"
            />
          );
        }
      });
    }
  };

  const renderAlly = () => {
    // console.log(tempDataRemoveThisLater, Object.keys(tempDataRemoveThisLater).length);

    return Array.from(Array(columnCount).keys()).map((i, index) => {
      return (
        <div
          className="feed-items-col"
          key={index}
          style={{
            width: `${(1 / columnCount) * 100}%`,
            // position: 'relative',
            // backgroundColor: ['red', 'yellow', 'green', 'blue'][Math.round(Math.random() * 3)],
          }}
        >
          {renderInnerAlly(index)}
        </div>
      );
    });
  };

  const [isShownPasswordExpired, setIsShownPasswordExpired] = useState(accounts.isSignedIn && !accounts.isShown180daysPasswordLimitation);

  const dismissPopupChangePasswordHandler = () => {
    closePopupChangePassword();
    setIsShownPasswordExpired((state) => false);
  };

  const confirmPopupChangePasswordHandler = (e) => {
    const { currentpw, newpw, confirmNewpw } = popupFormPasswords;
    let validated = 0;
    let vmax = 3;

    if (currentpw.length > 0) {
      validated++;
      setPopupFormError((state) => ({ ...state, currentpw: 0 }));
    } else {
      setPopupFormError((state) => ({ ...state, currentpw: 1 }));
    }

    if (newpw.length > 0 && confirmNewpw.length > 0 && newpw === confirmNewpw) {
      validated += 2;
      setPopupFormError((state) => ({ ...state, newpw: 0, confirmNewpw: 0 }));
    } else {
      setPopupFormError((state) => ({ ...state, newpw: 1, confirmNewpw: 1 }));
    }

    if (validated >= vmax) {
      console.log('모든 조건 만족. 변경 여기서 진행');
      forums
        .patch('/members/password', {
          oldPassword: currentpw,
          password: newpw,
          repeatPassword: confirmNewpw,
        })
        .then((res) => {
          console.log('비밀번호 변경 성공');
          console.log(res);
          dismissPopupChangePasswordHandler();
        });
    }
  };

  const [popupFormPasswords, setPopupFormPasswords] = useState({
    currentpw: '',
    newpw: '',
    confirmNewpw: '',
  });

  const [popupFormError, setPopupFormError] = useState({
    currentpw: 0,
    newpw: 0,
    confirmNewpw: 0,
  });

  const handlePopupOnSubmit = (e) => {
    e.preventDefault();
  };

  //05.03.22
  const [recentPostsNotice, setRecentPostsNotice] = useState([]);

  useEffect(() => {
    forums
      .get('공지사항3개', {
        params: {
          sort: 'postId,desc',
          page: 1,
          size: 3,
        },
      })
      .then((res) => {
        setRecentPostsNotice([...res.data]);
      });
  }, []);

  return (
    <>
      <AlertPopup2
        visible={isShownPasswordExpired}
        confirmButtonType="submit"
        preventClickOuterToClose="true"
        handlerCancel={() => dismissPopupChangePasswordHandler()}
        handlerConfirm={() => confirmPopupChangePasswordHandler()}
        onMouseDown={(e) => dismissPopupChangePasswordHandler(e)}
        title="비밀번호 재설정"
        confirmText="변경"
        dismissText="다음에 하기"
        confirmType="positive"
      >
        <p style={{ paddingBottom: '2rem' }}>마지막으로 비밀번호를 변경한 기간으로부터 180일이 지났습니다.</p>
        <form name="epw" onSubmit={(e) => handlePopupOnSubmit(e)}>
          <input
            className="popup-input"
            name="currentpw"
            type="password"
            value={popupFormPasswords.currentpw}
            onChange={(e) => setPopupFormPasswords((state) => ({ ...state, [e.target.name]: e.target.value }))}
            placeholder="현재 비밀번호"
          />
          <p className="popup-input-error" style={{ display: popupFormError.currentpw ? '' : 'none' }}>
            입력란이 비었거나 일치하지 않습니다.
          </p>
          <input
            className="popup-input"
            name="newpw"
            type="password"
            value={popupFormPasswords.newpw}
            onChange={(e) => setPopupFormPasswords((state) => ({ ...state, [e.target.name]: e.target.value }))}
            placeholder="새 비밀번호"
          />
          <p className="popup-input-error" style={{ display: popupFormError.newpw ? '' : 'none' }}>
            입력란이 비었거나 하위 항목과 일치하지 않습니다.
          </p>
          <input
            className="popup-input"
            name="confirmNewpw"
            type="password"
            value={popupFormPasswords.confirmNewpw}
            onChange={(e) => setPopupFormPasswords((state) => ({ ...state, [e.target.name]: e.target.value }))}
            placeholder="새 비밀번호 재입력"
          />
          <p className="popup-input-error" style={{ display: popupFormError.confirmNewpw ? '' : 'none' }}>
            입력란이 비었거나 상위 항목과 일치하지 않습니다.
          </p>
        </form>
      </AlertPopup2>

      <main className={colorMainClassname[seto.theme]}>
        <div style={{ position: 'fixed', padding: '2rem', zIndex: '100' }}>
          <div className={logo} onClick={() => ref.current[0].scrollIntoView()}></div>
        </div>

        <section ref={(e) => (ref.current[0] = e)} className="section-welcome">
          <div className="section-welcome__back noselect">
            <div className="symbol"></div>
            <div className="title-wrap">
              <h3 className="title">
                <span className={seto.language === 1 ? '' : 'en'}>{translated.section.welcome.title[seto.language]}</span>
              </h3>
            </div>
            <p className="subtitle">프로젝트에 즐거움을, 모두에게 기회를.</p>
          </div>
        </section>

        <section ref={(e) => (ref.current[1] = e)} className="section-notice" style={{ backgroundColor: colorMainSection[seto.theme] }}>
          <div className="section-notice__area area" style={{ padding: '2rem' }}>
            <div className="container-big">
              <h3 className="title" style={{ color: colorThemeContainerText[seto.theme] }}>
                <span className={seto.language === 1 ? '' : 'en'}>{translated.section.notices.title[seto.language]}</span>
              </h3>
              {
                /* <Link to="/post/notice/0" className={colorMainRecentNotice[seto.theme]}>
                동아리 인원을 모집합니다
              </Link>
              <p className="title-date">2022년 2월 2일</p> */
                (function () {
                  let __date = new Date();

                  if (recentPostsNotice[0]) {
                    let { postId, title, createdAt } = recentPostsNotice[0];

                    return (
                      <>
                        <Link to={`/post/notice/${postId}`} className={colorMainRecentNotice[seto.theme]}>
                          {title}
                        </Link>
                        <p className="title-date">
                          {(function () {
                            let t = getRecalculatedTime(createdAt);
                            return `${t.year}년 ${t.month}월 ${t.day}일`;
                          })()}
                        </p>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <p className={colorMainRecentNotice[seto.theme]}>아직 글이 없어요.</p>
                        <p className="title-date">
                          {__date.getFullYear()}년 {__date.getMonth() + 1}월 {__date.getDate()}일
                        </p>
                      </>
                    );
                  }
                })()
              }
            </div>
            <div className="container-small">
              {
                /* <Link to="/post/notice/1" className="container-small__notice">
                <p className={colorMainRecentNoticeSmall[seto.theme]}>이제 막 시작된 서비스입니다. 이제 막 시작된 서비스입니다.</p>
                <p className="container-small__notice-date">2022년 2월 1일</p>
              </Link>

              <Link to="/post/notice/2" className="container-small__notice">
                <p className={colorMainRecentNoticeSmall[seto.theme]}>이제 막 시작된 서비스입니다.</p>
                <p className="container-small__notice-date">2022년 1월 31일</p>
              </Link> */
                (function (arr) {
                  return arr.map((i) => {
                    if (recentPostsNotice[i]) {
                      let { postId, title, createdAt } = recentPostsNotice[i];
                      let t = getRecalculatedTime(createdAt);
                      return (
                        <Link to={`/post/notice/${postId}`} className="container-small__notice">
                          <p className={colorMainRecentNoticeSmall[seto.theme]}>{title}</p>
                          <p className="container-small__notice-date">
                            {t.year}년 {t.month}월 {t.day}일
                          </p>
                        </Link>
                      );
                    } else {
                      return (
                        <div className="container-small__notice">
                          <p className={colorMainRecentNoticeSmall[seto.theme]}>아직 글이 없어요.</p>
                          <p className="container-small__notice-date">---- 년 - 월 - 일</p>
                        </div>
                      );
                    }
                  });
                })([1, 2])
              }
            </div>
          </div>
        </section>

        <section ref={(e) => (ref.current[2] = e)} className={colorMainFeedBackground[seto.theme]}>
          <div className="area" style={{ padding: '2rem' }}>
            <h3 className="title" style={{ color: colorThemeContainerText[seto.theme] }}>
              <span className={seto.language === 1 ? '' : 'en'}>{translated.section.recents.title[seto.language]}</span>
            </h3>

            <div className="feed-items">{renderAlly()}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
