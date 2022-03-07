import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';

const Board = (props) => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));
    //Redux

    const { type } = useParams();

    useEffect(() => {
        console.log(type);
        console.log(props);
    }, []);

    const renderBoardAllPostItems = (count) => {
        return Array.from(Array(count)).map((i, index) => {
            return (
                <Link to={`/post/${index}`} className="section-allpost__container-item">
                    <p className="section-allpost__container-item__number">{index + 1}</p>
                    <div
                        className="section-allpost__container-item__image"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no_image.png)` }}
                    ></div>
                    <div className="section-allpost__container-item__texts">
                        <p className="section-allpost__container-item__texts-title">
                            제목은 이렇습니다. 제목은 이렇습니다. 제목은 이렇습니다. 제목은 이렇습니다. 제목은
                            이렇습니다. 제목은 이렇습니다. 제목은 이렇습니다.
                        </p>
                        <div className="section-allpost__container-item__texts-postinfo">
                            <div className="section-allpost__container-item__texts-postinfo__info">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/ico_uploader.svg`}
                                    className="section-allpost__container-item__texts-postinfo__info-icon"
                                ></img>
                                <p className="section-allpost__container-item__texts-postinfo__info-text">관리자</p>
                            </div>

                            <div className="section-allpost__container-item__texts-postinfo__info">
                                <img
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
    };

    const renderBoardAllPosts = () => {
        return (
            <React.Fragment>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">공지사항</p>
                    <Link to="/board/notice" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">{renderBoardAllPostItems(3)}</div>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">자유게시판</p>
                    <Link to="/board/free" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">{renderBoardAllPostItems(3)}</div>
                <div className="section-allpost__title">
                    <p className="section-allpost__title-title">질문게시판</p>
                    <Link to="/board/question" className="section-allpost__title-showmore">
                        더 보기{' '}
                        <span className="section-allpost__title-showmore__icon">
                            <img src={`${process.env.PUBLIC_URL}/images/ico_more2.svg`} />
                        </span>
                    </Link>
                </div>
                <div className="section-allpost__container">
                    <p style={{ textAlign: 'center' }}>아직 업로드된 글이 없습니다.</p>
                </div>
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
                return <div style={{ fontSize: '2.4rem' }}>공지사항</div>;
            default:
                return renderBoardAllPosts();
        }
    };

    const renderSubMenu = () => {
        const _menu = [
            // { title: '전체', link: '/board/all' },
            { title: '공지', link: '/board/notice' },
            { title: '자유게시판', link: '/board/free' },
            { title: '질문게시판', link: '/board/question' },
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
                    <p className="section-submenu-menu__title">{i.title}</p>
                </NavLink>
            );
        });
    };

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div className="main-posts">
                <div className="area">
                    <div className="section-submenu">{renderSubMenu()}</div>
                    <div className="section-allpost">{renderBoard()}</div>
                </div>
                <div style={{ height: '7.8rem' }}></div>
            </div>
        </main>
    );
};

export default Board;
