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

  const [init, setInit] = useState(false);

  const { type, postId } = useParams();

  const [isDataFound, setIsDataFound] = useState(false);

  const [contentData, setContentData] = useState({});

  const [commentsData, setCommentsData] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const [comment, setComment] = useState({
    value: '',
  });

  const [isAlertDeleteShown, setIsAlertDeleteShown] = useState(false);

  const [sortCommentByNew, setSortCommentByNew] = useState(false);

  const [isEditingComment, setIsEditingComment] = useState(-1);

  const [editingCommentTarget, setEditingCommentTarget] = useState('');

  const handleEditComment = (num, body) => {
    setIsEditingComment(num);
    setEditingCommentTarget(body);
  };

  const handleSubmitEditedComment = (id) => {
    if (editingCommentTarget.length <= 0) {
      console.log('댓글을 입력하세요.');
    } else {
      forums.patch(`/posts/${type}/${postId}/comments/${id}`, { body: editingCommentTarget }).then((res) => {
        console.log('댓글 패치 완료');
        //그리고
        forums.get(`/posts/${type}/${postId}/comments`).then((res) => {
          console.log('다시 받아온 댓글?', res.data);
          setCommentsData((state) => res.data);
          setCommentCount(res.data.length);
          setComment((state) => ({ ...state, value: '' }));
        });
        setIsEditingComment(-1);
      });
    }
  };

  const handleLikeComment = (id) => {
    forums.post(`/posts/${type}/${postId}/comments/${id}/like`).then((res) => {
      console.log('좋아요 성공');
      //그리고
      forums.get(`/posts/${type}/${postId}/comments`).then((res) => {
        console.log('다시 받아온 댓글?', res.data);
        setCommentsData((state) => res.data);
        setCommentCount(res.data.length);
        setComment((state) => ({ ...state, value: '' }));
      });
    });
  };

  const handleSubmitComment = () => {
    if (comment.value.length <= 0) {
      console.log('댓글을 입력하세요.');
    } else {
      forums.post(`/posts/${type}/${postId}/comments`, { body: comment.value }).then((res) => {
        console.log('댓글 포스트 완료');
        //그리고
        forums.get(`/posts/${type}/${postId}/comments`).then((res) => {
          console.log('다시 받아온 댓글?', res.data);
          setCommentsData((state) => res.data);
          setCommentCount(res.data.length);
          setComment((state) => ({ ...state, value: '' }));
        });
      });
    }
  };

  const handleRemoveComment = (commentId) => {
    forums.delete(`/posts/${type}/${postId}/comments/${commentId}`).then((res) => {
      console.log(`${commentId}번 댓글 삭제 완료`);
      //그리고
      forums.get(`/posts/${type}/${postId}/comments`).then((res) => {
        console.log('다시 받아온 댓글?', res.data);
        setCommentsData((state) => res.data);
        setCommentCount(res.data.length);
        setComment((state) => ({ ...state, value: '' }));
      });
    });
  };

  const renderComments = () => {
    if (commentsData.length > 0) {
      return commentsData.map((i, index) => {
        // console.log(`커멘트 ${index}번`, i);

        const { body, createdAt, id, like, name, profileImage, username } = i;
        let _redate = getRecalculatedTime(createdAt);

        return (
          <div className="section-comments__item" key={index}>
            <Link to="/member/root" className="section-comments__item-profile">
              <img
                src={
                  profileImage
                    ? `${forums.defaults.baseURL}/members/profiles/${profileImage}`
                    : `${process.env.PUBLIC_URL}/images/no-profile.svg`
                }
                alt="Profile image"
                width="100%"
              />
            </Link>
            <div className="section-comments__item-texts">
              <p className="username">
                {name} <span className="username-posteddate">{`${_redate.month}월 ${_redate.day}일`}</span>
              </p>
              {isEditingComment === id ? (
                <input
                  type="text"
                  value={editingCommentTarget}
                  style={{
                    padding: '5px',
                    marginTop: '1rem',
                    width: '100%',
                    display: 'inline-block',
                    outline: 'none',
                    border: '1px solid #e0e0e0',
                  }}
                  onChange={(e) => setEditingCommentTarget(e.target.value)}
                />
              ) : (
                <p className="comment">{body}</p>
              )}
              <div className="comment-tools">
                <button
                  className={`comment-tools__like ${i.isLiked ? 'comment-tools__like__liked' : null}`}
                  type="button"
                  onClick={() => handleLikeComment(id)}
                ></button>
                <p className="comment-tools__like-count">{like ? like : '0'}</p>

                {accounts.fromToken ? (
                  accounts.fromToken.username === username || accounts.isAdmin === true ? (
                    isEditingComment === -1 ? (
                      <>
                        <button className="transparent" type="button" onClick={(e) => handleEditComment(id, body)}>
                          수정
                        </button>
                        <button className="negative" type="button" onClick={() => handleRemoveComment(id)}>
                          삭제
                        </button>
                      </>
                    ) : isEditingComment === id ? (
                      <>
                        <button className="positive" type="button" onClick={(e) => handleSubmitEditedComment(id)}>
                          완료
                        </button>
                        <button className="transparent" type="button" onClick={() => setIsEditingComment(-1)}>
                          취소
                        </button>
                      </>
                    ) : null
                  ) : null
                ) : null}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p style={{ padding: '1rem 0', textAlign: 'center' }}>아직 댓글이 없어요. 첫번째로 댓글을 써 보아요.</p>;
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
    const { body, createdAt, id, name, title, username, views } = contentData;
    // console.log('contentData :', contentData);

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
            <div dangerouslySetInnerHTML={{ __html: body }} style={{ width: '100%', overflow: 'hidden' }}></div>
          </section>

          {accounts.fromToken && accounts.fromToken.username === username ? (
            <>
              <section className="section-posttool">
                <Link to={`/post/edit/${type}/${postId}`} className="button-general" type="button">
                  수정
                </Link>
                <button className="button-negative" type="button" onClick={() => setIsAlertDeleteShown((state) => true)}>
                  삭제
                </button>
              </section>
            </>
          ) : null}

          <section className="section-comments" name="comments">
            <p className="section-comments__totals">
              댓글 <span className="section-comments__totals-count">{`총 ${commentCount}개`}</span>
              <button type="button" className="section-comments__totals-sort" onClick={() => setSortCommentByNew((state) => !state)}>
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
              <button type="button" className="section-comments__form-send" onClick={() => handleSubmitComment()}>
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
    if (!init) {
      window.scrollTo(0, 0);
      forums.get(`/posts/${type}/${postId}`).then((res) => {
        console.log(res);
        setContentData(res.data);
      });

      forums.get(`/posts/${type}/${postId}/comments`).then((res) => {
        // console.log('하위는 댓글');

        setCommentsData((state) => [...state, ...res.data]);
        setCommentCount(res.data.length);
      });

      forums.get(`/posts/${type}/${postId}/comments/like`).then((res) => {
        console.log('하위는 좋아요');
        console.log(res);

        //   let _dbefore = [];

        //   commentsData.forEach(i => {
        //       _dbefore.push({...i, isAlreadyLiked: })
        //   })
      });

      setInit(true);
    }
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
