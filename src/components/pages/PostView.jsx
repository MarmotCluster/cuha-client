import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';
import history from '../../history';
import AlertPopup from '../AlertPopup';
import forums from '../../apis/forums';
import { getRecalculatedTime } from '../../utils';

const PostView = () => {
    const navigate = useNavigate();

    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));

    // REDUX

    const { type, postId } = useParams();

    const [isDataFound, setIsDataFound] = useState(false);

    const [contentData, setContentData] = useState({});

    const [comment, setComment] = useState({
        value: '',
    });

    const [isAlertDeleteShown, setIsAlertDeleteShown] = useState(false);

    const [sortCommentByNew, setSortCommentByNew] = useState(false);

    const handleSubmitComment = () => {
        if (comment.value.length <= 0) {
            console.log('댓글을 입력하세요.');
        }
    };

    const renderComments = () => {
        return Object.keys([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i, index) => {
            return (
                <div className="section-comments__item" key={index}>
                    <Link to="/member/root" className="section-comments__item-profile">
                        <img src={`${process.env.PUBLIC_URL}/images/no-profile.svg`} alt="Profile image" width="100%" />
                    </Link>
                    <div className="section-comments__item-texts">
                        <p className="username">
                            루트사용자 <span className="username-posteddate">하루 전</span>
                        </p>
                        <p className="comment">
                            댓글을 입력했어요.
                            <br />
                            댓글을 입력했어요.
                            <br />
                            댓글을 입력했어요.
                            <br />
                            댓글을 입력했어요.
                        </p>
                        <div className="comment-tools">
                            <button
                                className={`comment-tools__like ${i.isLiked ? 'comment-tools__like__liked' : null}`}
                                type="button"
                            ></button>
                            <p className="comment-tools__like-count">123</p>
                            <button className="transparent" type="button">
                                수정
                            </button>
                            <button className="negative" type="button">
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderNotFound = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                    fontSize: '1.4rem',
                    textAlign: 'center',
                }}
            >
                <h1>{`:(`}</h1>
                <p>존재하지 않는 게시물입니다.</p>

                <button
                    type="button"
                    onClick={() => history.back()}
                    style={{
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none',
                        margin: '2rem',
                        padding: '1rem 2rem',
                        backgroundColor: '#fff',
                        borderRadius: '100px',
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    돌아가기
                </button>
            </div>
        );
    };

    const renderFoundPost = () => {
        const { content, createdAt, id, name, title, username, views } = contentData;
        console.log('contentData :', contentData);

        return (
            <div className="main-posts">
                <div className="area">
                    <section className="section-posttitle">
                        <p className="title">{title ? title : 'Loading...'}</p>
                    </section>
                    <section className="section-postinfo">
                        <div>
                            <Link className="section-postinfo__link" to={`/board/${type}`}>
                                {(function () {
                                    switch (type) {
                                        case 'notice':
                                            return '공지사항';
                                        case 'free':
                                            return '자유게시판';
                                        case 'question':
                                            return '질문게시판';
                                        default:
                                            return null;
                                    }
                                })()}
                            </Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Link className="section-postinfo__link" to={`/member/${username}`}>
                                {name ? name : 'Uplaoder'}
                            </Link>
                            <p className="section-postinfo__date">
                                {createdAt
                                    ? (function () {
                                          const _res = getRecalculatedTime(createdAt);
                                          return `${_res.year}년 ${_res.month}월 ${_res.day}일`;
                                      })()
                                    : 'Jan 1, 1970'}
                            </p>
                            <p className="section-postinfo__commentcount">{views !== null ? views : '-'}</p>
                        </div>
                    </section>
                    <section className="section-post" style={{ width: '100%' }}>
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            style={{ width: '100%', overflow: 'hidden' }}
                        ></div>
                    </section>

                    {accounts.fromToken && accounts.fromToken.username === username ? (
                        <>
                            <section className="section-posttool">
                                <Link to={`/post/edit/${type}/${postId}`} className="button-general" type="button">
                                    수정
                                </Link>
                                <button
                                    className="button-negative"
                                    type="button"
                                    onClick={() => setIsAlertDeleteShown((state) => true)}
                                >
                                    삭제
                                </button>
                            </section>
                        </>
                    ) : null}

                    <section className="section-comments" name="comments">
                        <p className="section-comments__totals">
                            댓글 <span className="section-comments__totals-count">총 12개</span>
                            <button
                                type="button"
                                className="section-comments__totals-sort"
                                onClick={() => setSortCommentByNew((state) => !state)}
                            >
                                {sortCommentByNew ? '최신순 정렬' : '인기순 정렬'}
                            </button>
                        </p>

                        <form name="comments" className="section-comments__form" onSubmit={(e) => e.preventDefault()}>
                            <textarea
                                name="comment"
                                className="section-comments__form-inputbox"
                                placeholder="댓글을 입력하세요"
                                value={comment.value}
                                onChange={(e) => setComment((state) => ({ ...state, value: e.target.value }))}
                            ></textarea>
                            <button
                                type="button"
                                className="section-comments__form-send"
                                onClick={() => handleSubmitComment()}
                            >
                                <img src={`${process.env.PUBLIC_URL}/images/ico_send.svg`} />
                            </button>
                        </form>

                        <div style={{ height: '2rem' }}></div>

                        {/* comment item block */}
                        {renderComments()}
                        {/* comment item block */}
                    </section>
                </div>
            </div>
        );
    };

    const alertCancelHandler = (e) => {
        setIsAlertDeleteShown((state) => false);
    };

    const alertConfirmHandler = () => {
        console.log('글 삭제 진행');
        forums.delete(`/posts/${type}/${postId}`).then((res) => {
            console.log(res);
            navigate(`/board/${type}`);
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        forums.get(`/posts/${type}/${postId}`).then((res) => {
            console.log(res);
            setContentData(res.data);
        });
    }, []);

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
            <main className={colorMainClassname[seto.theme]}>{renderFoundPost()}</main>
        </>
    );
};

export default PostView;
