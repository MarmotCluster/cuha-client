import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';
import axios from 'axios';
import AlertPopup from '../AlertPopup';
import forums from '../../apis/forums';
import { getRecalculatedTime } from '../../utils';

const Board = (props) => {
  const { seto, accounts } = useSelector((state) => ({
    seto: state.seto,
    accounts: state.accounts,
  }));
  //Redux

  const { type } = useParams();

  const ref = useRef();

  const [isAlertDeleteShown, setIsAlertDeleteShown] = useState(false);

  // useEffect(() => {
  //     console.log(type);
  //     console.log(props);
  // }, []);

  const [boardData, setBoardData] = useState([]);
  const [requestRange, setRequestRange] = useState({
    start: 0,
    offset: 20,
  });
  const [isOnRequest, setIsOnRequest] = useState(true);
  const [hasDataNomore, setHasDataNomore] = useState(false);

  const [category, setCategory] = useState([]);

  const [postDeleteTarget, setPostDeleteTarget] = useState(-1);

  const [recent3Posts, setRecent3Posts] = useState({});

  function requestData() {
    const { start, offset } = requestRange;
    if (!hasDataNomore && type === 'notice') {
      forums
        .get(`/posts/${type}`, {
          params: {
            // page=${start}&size=${offset}
            page: start,
            size: offset,
            sort: `id,desc`,
          },
        })
        .then((res) => {
          console.log(res.data);

          setIsOnRequest((state) => false);
          if (res.data.length > 0) {
            setBoardData((state) => [...state, ...res.data]);
          } else {
            setHasDataNomore((state) => true);
          }
        });
    }
  }

  useEffect(() => {
    // console.log(type);

    // console.log('request range is changed :', requestRange);
    setIsOnRequest((state) => true);
    requestData();
  }, [requestRange, type]);

  useEffect(() => {
    let isScrollFinished = () => {
      return (
        Math.round(document.documentElement.scrollTop + document.documentElement.clientHeight) >= document.documentElement.offsetHeight
      );
    };

    let handleScroll = (e) => {
      // console.log(
      //     document.documentElement.clientHeight + document.documentElement.scrollTop,
      //     document.documentElement.offsetHeight,
      //     isScrollFinished()
      // );
      if (isScrollFinished()) {
        // console.log('?????? ??????');
        setRequestRange((state) => ({ ...state, start: state.start + 1 }));
      }

      // setTrace((state) => ({
      //     ...state,
      //     a: document.documentElement.scrollTop,
      //     b: document.documentElement.clientHeight,
      //     c: document.documentElement.offsetHeight,
      // }));
    };

    window.addEventListener('scroll', handleScroll);

    forums.get('/categories').then((res) => {
      const { data } = res;
      console.log('?????????', data);

      const _icon = {
        notice: 'ico_board_notice.svg',
        free: 'ico_board_free.svg',
        question: 'ico_board_qna.svg',
      };

      data.forEach((i) => {
        setCategory((state) => [
          ...state,
          {
            title: i.description,
            link: `/board/${i.categoryName}`,
            icon: _icon[i.categoryName],
          },
        ]);
      });

      data.forEach((i) => {
        forums.get(`/posts/${i.categoryName}`, { params: { sort: 'id,desc', page: 0, size: 3 } }).then((res2) => {
          setRecent3Posts((state) => ({ ...state, [i.categoryName]: res2.data }));
        });
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderBoardAllPostItems = (count, icon, isFromRequest = false) => {
    const renderTitleIcon = (type) => {
      let _list = { notice: 'ico_board_notice_colored.svg' };
      return (
        <div
          className="section-allpost__container-item__texts-title__icon"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/${_list[type]})`,
          }}
        ></div>
      );
    };

    if (isFromRequest) {
      return boardData.map((i, index) => {
        const { postId, title, content, views, username, name, createdAt, profileImage } = i;
        const _reCalculatedDate = getRecalculatedTime(createdAt);

        return (
          <div key={index} className="section-allpost__container-item">
            {/* <p className="section-allpost__container-item__number">{index + 1}</p> */}
            <div
              className="section-allpost__container-item__image"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no_image-square.png)` }}
            ></div>
            <div className="section-allpost__container-item__texts">
              <div className="section-allpost__container-item__texts-title">
                {icon ? renderTitleIcon(icon) : null}
                <Link to={`/post/${type}/${postId}`}>{`${title}`}</Link>
              </div>
              <div className="section-allpost__container-item__texts-postinfo">
                <Link to={`/member/${username}`} className="section-allpost__container-item__texts-postinfo__info">
                  <img
                    alt=""
                    src={
                      profileImage
                        ? `${forums.defaults.baseURL}/members/profiles/${profileImage}`
                        : `${process.env.PUBLIC_URL}/images/no-profile.svg`
                    }
                    className="section-allpost__container-item__texts-postinfo__info-icon"
                  ></img>
                  <p className="section-allpost__container-item__texts-postinfo__info-text">{name}</p>
                </Link>

                <div className="section-allpost__container-item__texts-postinfo__info">
                  <img
                    alt=""
                    src={`${process.env.PUBLIC_URL}/images/ico_uploaded_date.svg`}
                    className="section-allpost__container-item__texts-postinfo__info-icon"
                  ></img>
                  <p className="section-allpost__container-item__texts-postinfo__info-text">
                    {`${_reCalculatedDate.year}??? ${_reCalculatedDate.month}??? ${_reCalculatedDate.day}???`}
                  </p>
                  {accounts.isAdmin ? (
                    <button
                      className="section-allpost__container-item__texts-postinfo__info-delete"
                      onClick={() => {
                        setPostDeleteTarget(postId);
                        setIsAlertDeleteShown((state) => true);
                      }}
                    >
                      <span className="section-allpost__container-item__texts-postinfo__info-delete-icon"></span> ??????
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return Array.from(Array(count)).map((i, index) => {
        return (
          <Link key={index} to={`/post/${index}`} className="section-allpost__container-item">
            {/* <p className="section-allpost__container-item__number">{index + 1}</p> */}
            <div
              className="section-allpost__container-item__image"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no_image-square.png)` }}
            ></div>
            <div className="section-allpost__container-item__texts">
              <div className="section-allpost__container-item__texts-title">
                {icon ? renderTitleIcon(icon) : null}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </div>
              <div className="section-allpost__container-item__texts-postinfo">
                <div className="section-allpost__container-item__texts-postinfo__info">
                  <img
                    alt=""
                    src={`${process.env.PUBLIC_URL}/images/no-profile.svg`}
                    className="section-allpost__container-item__texts-postinfo__info-icon"
                  ></img>
                  <p className="section-allpost__container-item__texts-postinfo__info-text">?????????</p>
                </div>

                <div className="section-allpost__container-item__texts-postinfo__info">
                  <img
                    alt=""
                    src={`${process.env.PUBLIC_URL}/images/ico_uploaded_date.svg`}
                    className="section-allpost__container-item__texts-postinfo__info-icon"
                  ></img>
                  <p className="section-allpost__container-item__texts-postinfo__info-text">2022??? 2??? 22???</p>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  const renderBoardAllPosts = () => {
    if (recent3Posts) {
      return Object.keys(recent3Posts).map((i, index) => {
        console.log(i);
        return (
          <React.Fragment key={index}>
            <div className="section-allpost__title">
              <p className="section-allpost__title-title">
                {
                  {
                    notice: '????????????',
                    free: '???????????????',
                    question: '???????????????',
                  }[i]
                }
              </p>
              <Link to={`/board/${i}`} className="section-allpost__title-showmore">
                ??? ??????{' '}
                <span className="section-allpost__title-showmore__icon">
                  <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                </span>
              </Link>
            </div>
            {/* <div className="section-allpost__container">{renderBoardAllPostItems(3, 'notice')}</div> */}
            <div className="section-allpost__container">
              {(function (icon) {
                const renderTitleIcon = (type) => {
                  let _list = { notice: 'ico_board_notice_colored.svg' };
                  return (
                    <div
                      className="section-allpost__container-item__texts-title__icon"
                      style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${_list[type]})`,
                      }}
                    ></div>
                  );
                };

                console.log(recent3Posts[i]);
                return recent3Posts[i].map((j, index) => {
                  const { postId, title, content, views, username, name, createdAt, profileImage } = j;
                  const _reCalculatedDate = getRecalculatedTime(createdAt);
                  return (
                    <div key={index} className="section-allpost__container-item">
                      {/* <p className="section-allpost__container-item__number">{index + 1}</p> */}
                      <div
                        className="section-allpost__container-item__image"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no_image-square.png)` }}
                      ></div>
                      <div className="section-allpost__container-item__texts">
                        <div className="section-allpost__container-item__texts-title">
                          {icon === 'notice' ? renderTitleIcon(icon) : null}
                          <Link to={`/post/${type}/${postId}`}>{`${title}`}</Link>
                        </div>
                        <div className="section-allpost__container-item__texts-postinfo">
                          <Link to={`/member/${username}`} className="section-allpost__container-item__texts-postinfo__info">
                            <img
                              alt=""
                              src={
                                profileImage
                                  ? `${forums.defaults.baseURL}/members/profiles/${profileImage}`
                                  : `${process.env.PUBLIC_URL}/images/no-profile.svg`
                              }
                              className="section-allpost__container-item__texts-postinfo__info-icon"
                            ></img>
                            <p className="section-allpost__container-item__texts-postinfo__info-text">{name}</p>
                          </Link>

                          <div className="section-allpost__container-item__texts-postinfo__info">
                            <img
                              alt=""
                              src={`${process.env.PUBLIC_URL}/images/ico_uploaded_date.svg`}
                              className="section-allpost__container-item__texts-postinfo__info-icon"
                            ></img>
                            <p className="section-allpost__container-item__texts-postinfo__info-text">
                              {`${_reCalculatedDate.year}??? ${_reCalculatedDate.month}??? ${_reCalculatedDate.day}???`}
                            </p>
                            {accounts.isAdmin ? (
                              <button
                                className="section-allpost__container-item__texts-postinfo__info-delete"
                                onClick={() => {
                                  setPostDeleteTarget(postId);
                                  setIsAlertDeleteShown((state) => true);
                                }}
                              >
                                <span className="section-allpost__container-item__texts-postinfo__info-delete-icon"></span> ??????
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })(i)}
            </div>
          </React.Fragment>
        );
      });
    }

    // return (
    //   <React.Fragment>
    //     <div className="section-allpost__title">
    //       <p className="section-allpost__title-title">????????????</p>
    //       <Link to="/board/notice" className="section-allpost__title-showmore">
    //         ??? ??????{' '}
    //         <span className="section-allpost__title-showmore__icon">
    //           <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="section-allpost__container">{renderBoardAllPostItems(3, 'notice')}</div>

    //     <div className="section-allpost__title">
    //       <p className="section-allpost__title-title">???????????????</p>
    //       <Link to="/board/free" className="section-allpost__title-showmore">
    //         ??? ??????{' '}
    //         <span className="section-allpost__title-showmore__icon">
    //           <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="section-allpost__container">{renderBoardAllPostItems(3)}</div>

    //     <div className="section-allpost__title">
    //       <p className="section-allpost__title-title">???????????????</p>
    //       <Link to="/board/question" className="section-allpost__title-showmore">
    //         ??? ??????{' '}
    //         <span className="section-allpost__title-showmore__icon">
    //           <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="section-allpost__container">
    //       <p
    //         style={{
    //           textAlign: 'center',
    //           height: '8rem',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         ?????? ???????????? ?????? ????????????.
    //       </p>
    //     </div>
    //   </React.Fragment>
    // );
  };

  const renderBoardNoticeOnly = () => {
    return (
      <React.Fragment>
        <div className="section-allpost__title">
          <p className="section-allpost__title-title">????????????</p>
          <Link to="/post/create/notice" className="section-allpost__title-create">
            ??? ??????
            <span className="section-allpost__title-showmore__icon">
              <img alt="" src="/images/ico_create.svg" />
            </span>
          </Link>
        </div>
        <div className="section-allpost__container section-allpost__container__transparent">
          {renderBoardAllPostItems(null, 'notice', true)}
        </div>
        <p style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
          {hasDataNomore
            ? '??? ?????? ????????? ???????????? ????????????.'
            : isOnRequest
            ? '???????????? ??? ???????????? ???...'
            : `???????????? ??????????????? ??? ????????????...`}
        </p>
      </React.Fragment>
    );
  };

  const renderBoard = () => {
    switch (type) {
      case 'free':
        return <div style={{ fontSize: '2.4rem' }}>???????????????</div>;
      case 'question':
        return <div style={{ fontSize: '2.4rem' }}>???????????????</div>;
      case 'notice':
        return renderBoardNoticeOnly();
      default:
        return renderBoardAllPosts();
    }
  };

  const renderSubMenu = () => {
    // const _menu = [
    //     // { title: '??????', link: '/board/all' },
    //     { title: '??????', link: '/board/notice', icon: 'ico_board_notice.svg' },
    //     { title: '???????????????', link: '/board/free', icon: 'ico_board_free.svg' },
    //     { title: '???????????????', link: '/board/question', icon: 'ico_board_qna.svg' },
    // ];

    return category.map((i, index) => {
      console.log(i);
      return (
        <NavLink
          key={index}
          to={i.link}
          className={({ isActive }) => (isActive ? 'section-submenu-menu section-submenu-menu-active' : 'section-submenu-menu')}
        >
          <div className="section-submenu-menu__title">
            <div
              className="section-submenu-menu__image"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${i.icon})` }}
            ></div>
            <p>{i.title}</p>
          </div>
        </NavLink>
      );
    });
  };

  const alertCancelHandler = (e) => {
    setIsAlertDeleteShown((state) => false);
  };

  const alertConfirmHandler = () => {
    console.log('??? ?????? ??????');
    forums.delete(`/posts/${type}/${postDeleteTarget}`).then((res) => {
      console.log(res, '?????? ?????? ??????');
      setIsAlertDeleteShown(false);
    });
  };

  return (
    <>
      <AlertPopup
        visible={isAlertDeleteShown}
        handlerCancel={() => alertCancelHandler()}
        handlerConfirm={() => alertConfirmHandler()}
        onMouseDown={(e) => alertCancelHandler(e)}
        title="??? ??????"
        desc="????????? ?????? ?????? ????????? ??? ????????????"
        confirmText="??????"
        dismissText="??????"
      />
      <main ref={ref} className={colorMainClassname[seto.theme]}>
        <div className="main-posts">
          <div className="area">
            <div className="section-submenu">{renderSubMenu()}</div>
            <div className="section-allpost">{renderBoard()}</div>
          </div>
          <div style={{ height: '7.8rem' }}></div>
        </div>
      </main>
    </>
  );
};

export default Board;
