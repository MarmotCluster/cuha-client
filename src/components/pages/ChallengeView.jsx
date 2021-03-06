import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import forums from '../../apis/forums';
import AlertPopup from '../AlertPopup';
import { colorMainClassname } from './utils';

const ChallengeView = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const { postId } = useParams();

  const navigate = useNavigate();

  const [isAlertDeleteShown, setIsAlertDeleteShown] = useState(false);

  const alertCancelHandler = (e) => {
    setIsAlertDeleteShown((state) => false);
  };

  const alertConfirmHandler = () => {
    console.log('글 삭제 진행');
    forums.delete(`/problems/${postId}`).then((res) => {
      console.log(res);
      navigate(`/challenge`);
    });
  };

  const [currentPost, setCurrentPost] = useState({});
  const [answer, setAnswer] = useState('');
  const [correctIs, setCorrectIs] = useState('');

  useEffect(() => {
    forums.get(`/problems/${postId}`).then((res) => {
      console.log('글 발견. 불러오기 완료', res.data);
      setCurrentPost((state) => ({ ...res.data }));
      // setCorrectIs(res.data.)
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
      <main className={colorMainClassname[seto.theme]}>
        <div className="area" style={{ fontSize: '1.4rem', padding: '4rem 0' }}>
          <div className="main-challenges">
            <div className="main-challenges-body">
              <div className="main-challenges-body__bookmark">
                <p>
                  {
                    {
                      FORENSIC: '포렌식',
                      MISC: 'ETC',
                      REVERSING: '리버싱',
                      SYSTEM: '시스템해킹',
                      WEB: '웹해킹',
                    }[currentPost.problemType]
                  }
                </p>
              </div>

              <div className="main-challenges-body__head">
                <div className="main-challenges-body__head-headers">
                  <p className="challenge-title">{currentPost.title ? currentPost.title : 'loading...'}</p>
                  <div className="challenge-info">
                    <span>108명 도전</span> | <span>7명 통과</span>
                  </div>
                </div>
                <p className="main-challenges-body__head-reward">
                  {currentPost.score ? currentPost.score : '-'}
                  <span>pt</span>
                </p>
              </div>

              <div className="main-challenges-body__body">
                <p className="main-challenges-body__body-title">문제 설명</p>
                <div className="main-challenges-body__body-contain">
                  <div
                    className="body-explains"
                    dangerouslySetInnerHTML={{
                      __html: currentPost.body ? currentPost.body : 'loading...',
                    }}
                  ></div>
                  <a className="body-downloads" href="#" download>
                    <div className="body-downloads__icon"></div>
                    <p>hello-world.zip</p>
                  </a>
                </div>
              </div>

              <div className="main-challenges-body__answer">
                <p className="main-challenges-body__answer-title">내 대답은?</p>
                <input
                  type="text"
                  className="main-challenges-body__answer-input"
                  placeholder={accounts.isSignedIn ? '정답을 입력하세요.' : '로그인하고 문제를 풀어보세요.'}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      if (accounts.isSignedIn) {
                        try {
                          let res = await forums.post(`/problems/submit/${postId}`, { flag: answer });
                          console.log('정답입니다!');
                        } catch (ex) {
                          console.log(ex.response.data.message);
                        }
                      } else {
                        navigate('/login');
                      }
                    }
                  }}
                ></input>
              </div>
            </div>

            <Link to="/challenge" className="main-challenges-bg main-challenges-bg__button">
              다른 문제 풀러가기
            </Link>

            <button
              type="button"
              onClick={async () => {
                try {
                  let res = await forums.get(`/problems/${postId}/solution`);
                  navigate(`/challenge/solution/${postId}`);
                } catch (ex) {
                  // console.log(ex.response);

                  if (accounts.isAdmin) {
                    navigate(`/challenge/solution/create/${postId}`);
                  } else {
                    console.log('일반사용자에게 : 관리자가 풀이를 따로 제공하지 않은 문제입니다.');
                  }
                }
              }}
              // to={`/challenge/solution/${postId}`}
              className="main-challenges-bg main-challenges-bg__button"
            >
              이 문제 풀이 보러가기
            </button>

            {accounts.isAdmin ? (
              <React.Fragment>
                <Link to={`/challenge/edit/${postId}`} className="main-challenges-bg main-challenges-bg__button">
                  문제 수정
                </Link>
                <button
                  className="main-challenges-bg main-challenges-bg__button"
                  style={{ color: '#f4f4f4', backgroundColor: '#d0342c' }}
                  onClick={() => setIsAlertDeleteShown(true)}
                >
                  이 문제 삭제
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default ChallengeView;
