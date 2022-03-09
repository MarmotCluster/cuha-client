import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';
import axios from 'axios';
import AlertPopup from '../AlertPopup';

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

    // const [trace, setTrace] = useState({});

    function requestData() {
        const { start, offset } = requestRange;
        if (!hasDataNomore && type === 'notice') {
            axios
                .get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${start + offset}`)
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
                Math.round(document.documentElement.scrollTop + document.documentElement.clientHeight) >=
                document.documentElement.offsetHeight
            );
        };

        let handleScroll = (e) => {
            // console.log(
            //     document.documentElement.clientHeight + document.documentElement.scrollTop,
            //     document.documentElement.offsetHeight,
            //     isScrollFinished()
            // );
            if (isScrollFinished()) {
                // console.log('끝에 도달');
                setRequestRange((state) => ({ ...state, start: state.start + 20 }));
            }

            // setTrace((state) => ({
            //     ...state,
            //     a: document.documentElement.scrollTop,
            //     b: document.documentElement.clientHeight,
            //     c: document.documentElement.offsetHeight,
            // }));
        };

        window.addEventListener('scroll', handleScroll);

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
                const { body, id, title, userId } = i;

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
                                <Link to={`/post/${id}`}>{`${id} ${title}`}</Link>
                            </div>
                            <div className="section-allpost__container-item__texts-postinfo">
                                <Link
                                    to="/member/root"
                                    className="section-allpost__container-item__texts-postinfo__info"
                                >
                                    <img
                                        alt=""
                                        src={`${process.env.PUBLIC_URL}/images/no-profile.svg`}
                                        className="section-allpost__container-item__texts-postinfo__info-icon"
                                    ></img>
                                    <p className="section-allpost__container-item__texts-postinfo__info-text">관리자</p>
                                </Link>

                                <div className="section-allpost__container-item__texts-postinfo__info">
                                    <img
                                        alt=""
                                        src={`${process.env.PUBLIC_URL}/images/ico_uploaded_date.svg`}
                                        className="section-allpost__container-item__texts-postinfo__info-icon"
                                    ></img>
                                    <p className="section-allpost__container-item__texts-postinfo__info-text">
                                        2022년 2월 22일
                                    </p>
                                    {accounts.isAdmin ? (
                                        <button
                                            className="section-allpost__container-item__texts-postinfo__info-delete"
                                            onClick={() => setIsAlertDeleteShown((state) => true)}
                                        >
                                            <span className="section-allpost__container-item__texts-postinfo__info-delete-icon"></span>{' '}
                                            삭제
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
                                    <p className="section-allpost__container-item__texts-postinfo__info-text">관리자</p>
                                </div>

                                <div className="section-allpost__container-item__texts-postinfo__info">
                                    <img
                                        alt=""
                                        src={`${process.env.PUBLIC_URL}/images/ico_uploaded_date.svg`}
                                        className="section-allpost__container-item__texts-postinfo__info-icon"
                                    ></img>
                                    <p className="section-allpost__container-item__texts-postinfo__info-text">
                                        2022년 2월 22일
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            });
        }
    };

    const renderBoardAllPosts = () => {
        return (
            <React.Fragment>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">공지사항</p>
                    <Link to="/board/notice" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">{renderBoardAllPostItems(3, 'notice')}</div>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">자유게시판</p>
                    <Link to="/board/free" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">{renderBoardAllPostItems(3)}</div>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">질문게시판</p>
                    <Link to="/board/question" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img alt="" src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">
                    <p
                        style={{
                            textAlign: 'center',
                            height: '8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        아직 업로드된 글이 없습니다.
                    </p>
                </div>
            </React.Fragment>
        );
    };

    const renderBoardNoticeOnly = () => {
        return (
            <React.Fragment>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">공지사항</p>
                    <Link to="/post/create/notice" className="section-allpost__title-create">
                        글 쓰기
                        <span class="section-allpost__title-showmore__icon">
                            <img alt="" src="/images/ico_create.svg" />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container section-allpost__container__transparent">
                    {renderBoardAllPostItems(null, 'notice', true)}
                </div>
                <p style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
                    {hasDataNomore
                        ? '더 이상 받아올 데이터가 없습니다.'
                        : isOnRequest
                        ? '데이터를 더 불러오는 중...'
                        : `여기까지 스크롤하여 더 로드하기...`}
                </p>
            </React.Fragment>
        );
    };

    const renderBoard = () => {
        switch (type) {
            case 'free':
                return <div style={{ fontSize: '2.4rem' }}>자유게시판</div>;
            case 'question':
                return <div style={{ fontSize: '2.4rem' }}>질문게시판</div>;
            case 'notice':
                return renderBoardNoticeOnly();
            default:
                return renderBoardAllPosts();
        }
    };

    const renderSubMenu = () => {
        const _menu = [
            // { title: '전체', link: '/board/all' },
            { title: '공지', link: '/board/notice', icon: 'ico_board_notice.svg' },
            { title: '자유게시판', link: '/board/free', icon: 'ico_board_free.svg' },
            { title: '질문게시판', link: '/board/question', icon: 'ico_board_qna.svg' },
        ];

        return _menu.map((i, index) => {
            return (
                <NavLink
                    key={index}
                    to={i.link}
                    className={({ isActive }) =>
                        isActive ? 'section-submenu-menu section-submenu-menu-active' : 'section-submenu-menu'
                    }
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
        console.log('글 삭제 진행');
    };

    return (
        <>
            <AlertPopup
                visible={isAlertDeleteShown}
                handlerCancel={() => alertCancelHandler()}
                handlerConfirm={() => alertConfirmHandler()}
                onMouseDown={(e) => alertCancelHandler(e)}
                title="글 삭제"
                desc="삭제된 글은 다시 복구할 수 없습니다"
                confirmText="삭제"
                dismissText="취소"
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
