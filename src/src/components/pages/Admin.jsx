import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminAccount from './admins/AdminAccount';
import AdminAll from './admins/AdminAll';
import AdminBoard from './admins/AdminBoard';
import AdminComment from './admins/AdminComment';
import AdminCTF from './admins/AdminCTF';
import forums from '../../apis/forums';

const Admin = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!type) {
      navigate('/admin/all');
    }
    window.document.body.style.backgroundColor = '#F5F6FB';
  });

  const renderRecentPostsCategory = () => {
    let _list = [
      {
        title: '제목',
        width: '50%',
      },
      {
        title: '작성자',
        width: '10%',
      },
      {
        title: '게시판',
        width: '10%',
      },
      {
        title: '작성일',
        width: '10%',
      },
      {
        title: '조회수',
        width: '10%',
      },
      {
        title: '추천',
        width: '10%',
      },
    ];

    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.width === '10%' ? 'center' : 'left',
            paddingLeft: i.width === '50%' ? '1rem' : null,
          }}
        >
          {i.title}
        </div>
      );
    });
  };

  const renderRecentPosts = () => {
    if (requests.posts) {
      return requests.posts.map((i, index) => {
        let _list = [
          {
            title: i.title,
            width: '50%',
          },
          {
            title: i.username,
            width: '10%',
          },
          {
            title: {
              notice: '공지사항',
              free: '자유게시판',
              question: '질문게시판',
            }[i.category],
            width: '10%',
          },
          {
            title: i.createdAt,
            width: '10%',
          },
          {
            title: i.views,
            width: '10%',
          },
          {
            title: i.like,
            width: '10%',
          },
        ];

        return (
          <div key={index} className="inner-category">
            {renderRecentPost(_list)}
          </div>
        );
      });
    }
  };

  const renderRecentPost = (_list) => {
    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.width === '10%' ? 'center' : 'left',
            paddingLeft: i.width === '50%' ? '1rem' : null,
            color: 'black',
          }}
        >
          {i.title}
        </div>
      );
    });
  };

  const renderRecentCommentsCategory = () => {
    let _list = [
      {
        title: '내용',
        width: '80%',
      },
      {
        title: '작성자',
        width: '20%',
      },
    ];

    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.width === '20%' ? 'right' : 'left',
            paddingLeft: i.width !== '20%' ? '1rem' : null,
          }}
        >
          {i.title}
        </div>
      );
    });
  };

  const renderRecentComments = () => {
    if (requests.comments) {
      return requests.comments.map((i, index) => {
        let _list = [
          {
            title: i.body,
            width: '80%',
          },
          {
            title: i.name,
            width: '20%',
          },
        ];

        return (
          <div key={index} className="inner-category">
            {renderRecentComment(_list)}
          </div>
        );
      });
    } else {
      console.log('sahsdkajsdh');
    }
  };

  const renderRecentComment = (_list) => {
    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.width === '20%' ? 'right' : 'left',
            paddingLeft: i.width !== '20%' ? '1rem' : null,
            color: 'black',
          }}
        >
          {i.title}
        </div>
      );
    });
  };

  const renderRecentAccountsCategory = () => {
    let _list = [
      {
        title: '프로필',
        width: '5rem',
        textAlign: 'center',
        paddingLeft: null,
      },
      {
        title: '이름',
        width: 'calc(70% - 5rem)',
        textAlign: 'left',
        paddingLeft: '1rem',
      },
      {
        title: '생성일',
        width: 'calc(30% - 5rem)',
        textAlign: 'center',
        paddingLeft: null,
      },
    ];

    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.textAlign,
            paddingLeft: i.paddingLeft,
          }}
        >
          {i.title}
        </div>
      );
    });
  };

  const renderRecentAccounts = () => {
    if (requests.accounts) {
      return requests.accounts.map((i, index) => {
        let _list = [
          {
            title: i.profileImage,
            width: '5rem',
            textAlign: 'center',
            paddingLeft: null,
          },
          {
            title: i.name,
            width: 'calc(70% - 5rem)',
            textAlign: 'left',
            paddingLeft: '1rem',
          },
          {
            title: i.createdAt,
            width: 'calc(30% - 5rem)',
            textAlign: 'center',
            paddingLeft: null,
          },
        ];

        return (
          <div key={index} className="inner-category">
            {renderRecentAccount(_list)}
          </div>
        );
      });
    }
  };

  const renderRecentAccount = (_list) => {
    return _list.map((i, index) => {
      return (
        <div
          key={index}
          className="inner-category-item"
          style={{
            width: i.width,
            textAlign: i.textAlign,
            paddingLeft: i.paddingLeft,
            color: 'black',
          }}
        >
          {index === 0 ? (
            <div
              className="inner-category-item__profile"
              style={{
                backgroundImage: `url(${forums.defaults.baseURL}/members/profiles/${i.title})`,
              }}
            ></div>
          ) : (
            <>{i.title}</>
          )}
        </div>
      );
    });
  };

  const renderItem = (isCategory = false, _list) => {
    return _list.map((i, index) => {
      if (i.isAdminTool) {
        return (
          <div
            key={index}
            className="inner-category-item"
            style={{
              width: i.width,
              textAlign: i.textAlign,
              paddingLeft: i.paddingLeft,
              color: isCategory ? null : 'black',
            }}
          >
            <button type="button" className="inner-category-item__toolbtn" style={{ backgroundColor: 'transparent' }}>
              수정
            </button>
            <button
              type="button"
              className="inner-category-item__toolbtn"
              style={{ backgroundColor: '#d0342c', color: '#f4f4f4' }}
            >
              삭제
            </button>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className="inner-category-item"
            style={{
              width: i.width,
              textAlign: i.textAlign,
              paddingLeft: i.paddingLeft,
              color: isCategory ? null : 'black',
            }}
          >
            {i.title}
          </div>
        );
      }
    });
  };

  const renderDashBoard = {
    all: function () {
      return (
        <AdminAll
          renders={{
            renderRecentPostsCategory,
            renderRecentPosts,
            renderRecentCommentsCategory,
            renderRecentComments,
            renderRecentAccountsCategory,
            renderRecentAccounts,
          }}
        />
      );
    },
    board: function () {
      return (
        <AdminBoard
          renders={{
            renderRecentPostsCategory,
            renderRecentPosts,
            renderRecentCommentsCategory,
            renderRecentComments,
            renderRecentAccountsCategory,
            renderRecentAccounts,
            renderItem,
            requests: requests.posts,
          }}
        />
      );
    },
    comment: function () {
      return <AdminComment renders={{ renderItem, requests: requests.comments }} />;
    },
    account: function () {
      return <AdminAccount renders={{ renderItem, requests: requests.accounts }} />;
    },
    ctf: function () {
      return <AdminCTF renders={{ renderItem, requests: requests.ctfs }} />;
    },
  };

  const [requests, setRequests] = useState({
    posts: [],
    comments: [],
    accounts: [],
    ctfs: [],
  }); //경우에 따라 이중 혹은 단일 오브젝트로 될 수 있음.

  useEffect(() => {
    if (type) {
      switch (type) {
        case 'all':
          forums
            .get(`/posts`, { params: { start: 0, end: 9 } })
            .then((res) => {
              // console.log('받아온 9개의 최신글');
              setRequests((state) => ({ ...state, posts: res.data }));
            })
            .catch((err) => {
              console.log(err.toJSON());
            });
          forums.get(`/comments`, { params: { start: 0, end: 5 } }).then((res) => {
            // console.log('받아온 5개의 댓글');
            setRequests((state) => ({ ...state, comments: res.data }));
          });
          forums.get(`/members`, { params: { start: 0, end: 5 } }).then((res) => {
            // console.log('받아온 5개의 계정');
            setRequests((state) => ({ ...state, accounts: res.data }));
          });
          break;
        case 'board':
          forums.get(`/posts`, { params: { start: 0, end: 10 } }).then((res) => {
            setRequests((state) => ({ ...state, posts: res.data }));
          });
          break;
        case 'comment':
          forums.get(`/comments`, { params: { start: 0, end: 10 } }).then((res) => {
            setRequests((state) => ({ ...state, comments: res.data }));
          });
          break;
        case 'account':
          forums.get(`/members`, { params: { start: 0, end: 10 } }).then((res) => {
            setRequests((state) => ({ ...state, accounts: res.data }));
          });
          break;
        default:
          console.log('has no additional parameter in admin page');
          break;
      }
    }
  }, [type]);

  return (
    <div className="main-admin">
      <div className="main-admin__dummyheader">
        <p style={{ fontSize: '2rem', padding: '3rem' }}>DASHBOARD</p>
        <Link to="/" className="main-admin__dummyheader-gohome"></Link>
      </div>

      <React.Fragment>{type ? renderDashBoard[type]() : null}</React.Fragment>
    </div>
  );
};

export default Admin;
