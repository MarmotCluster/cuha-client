import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';
import history from '../../history';
import AlertPopup from '../AlertPopup';

const PostView = () => {
    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));

    // REDUX

    const params = useParams();

    const [isDataFound, setIsDataFound] = useState(false);

    const [comment, setComment] = useState({
        value: '',
    });

    const [isAlertDeleteShown, setIsAlertDeleteShown] = useState(false);

    const handleSubmitComment = () => {
        if (comment.value.length <= 0) {
            console.log('댓글을 입력하세요.');
        }
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
        return (
            <div style={{ fontSize: '1.4rem', position: 'relative' }}>
                <section
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '10rem',
                    }}
                >
                    <p style={{ fontWeight: '500', fontSize: '2rem' }}>게시물의 제목을 여기에 표시합니다.</p>
                </section>
                <section
                    style={{
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        height: '3.2rem',
                        justifyContent: 'space-between',
                        width: 'calc(100% - 4rem)',
                    }}
                >
                    <div>
                        <Link to="/board/free" style={{ textDecoration: 'none', color: 'inherit' }}>
                            자유게시판
                        </Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Link to="/member/root" style={{ textDecoration: 'none', color: 'inherit' }}>
                            김감각
                        </Link>
                        <span>&nbsp;|&nbsp;</span>
                        <p>2022-02-22</p>
                        <span>&nbsp;</span>
                        <p style={{ backgroundColor: 'white', padding: '.4rem', borderRadius: '100px' }}>10</p>
                    </div>
                </section>
                <section
                    style={{
                        position: 'relative',
                        minHeight: 'calc(100vh - 10rem)',
                        backgroundColor: 'white',
                        marginBottom: '2rem',
                        borderRadius: '2rem',
                        overflow: 'hidden',
                        padding: '2rem',
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: `<p style="color: red">hello world</p>` }}></div>
                </section>

                <section
                    name="posttool"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        padding: '0 2rem',
                    }}
                >
                    <button
                        type="button"
                        style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: '#e0e0e0',
                            color: '#333',
                            padding: '1rem 2rem',
                        }}
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: '#D0342C',
                            color: 'white',
                            padding: '1rem 2rem',
                        }}
                        onClick={() => setIsAlertDeleteShown((state) => true)}
                    >
                        삭제
                    </button>
                </section>

                <section
                    name="comments"
                    style={{
                        position: 'relative',

                        padding: '2rem',
                        backgroundColor: 'white',
                        marginBottom: '5.8rem',
                        borderRadius: '2rem',
                        overflow: 'hidden',
                    }}
                >
                    <p style={{ padding: '0 0 1rem 0', fontSize: '1.6rem', fontWeight: '900' }}>
                        댓글 <span style={{ fontSize: '1.4rem', fontWeight: '500' }}>총 12개</span>
                    </p>

                    <form name="comments" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex' }}>
                        <textarea
                            name="comment"
                            style={{
                                resize: 'none',
                                border: '1px solid #e0e0e0',
                                outline: 'none',
                                width: '100%',
                                height: '10rem',
                                padding: '1rem',
                                fontFamily: `'NanumSquare', sans-serif`,
                            }}
                            placeholder="댓글을 입력하세요"
                            value={comment.value}
                            onChange={(e) => setComment((state) => ({ ...state, value: e.target.value }))}
                        ></textarea>
                        <button
                            type="button"
                            style={{
                                cursor: 'pointer',
                                minWidth: '4rem',
                                border: 'none',
                                outline: 'none',
                                padding: '1rem',
                            }}
                            onClick={() => handleSubmitComment()}
                        >
                            <img src={`${process.env.PUBLIC_URL}/images/ico_send.svg`} />
                        </button>
                    </form>

                    <div style={{ height: '2rem' }}></div>

                    {/* comment item block */}
                    {Object.keys([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', padding: '1rem 0' }}>
                                <Link
                                    to="/member/root"
                                    style={{ overflow: 'hidden', borderRadius: '100px', width: '6rem', height: '6rem' }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/no-profile.svg`}
                                        alt="Profile image"
                                        width="100%"
                                    />
                                </Link>
                                <div style={{ marginLeft: '1rem' }}>
                                    <p>
                                        루트사용자{' '}
                                        <span style={{ paddingLeft: '5px', fontSize: '1.2rem', color: '#999' }}>
                                            하루 전
                                        </span>
                                    </p>
                                    <p style={{ paddingTop: '5px' }}>
                                        댓글을 입력했어요.
                                        <br />
                                        댓글을 입력했어요.
                                        <br />
                                        댓글을 입력했어요.
                                        <br />
                                        댓글을 입력했어요.
                                    </p>
                                    <div style={{ display: 'flex' }}>
                                        <button type="button">삭제</button>
                                        <button type="button">수정</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* comment item block */}
                </section>
            </div>
        );
    };

    const alertCancelHandler = (e) => {
        setIsAlertDeleteShown((state) => false);
    };

    const alertConfirmHandler = () => {
        console.log('글 삭제 진행');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
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
