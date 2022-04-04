import React from 'react';
import { Link } from 'react-router-dom';

const AdminCTF = ({ renders }) => {
  const {
    // renderRecentPostsCategory,
    // renderRecentPosts,
    // renderRecentCommentsCategory,
    // renderRecentComments,
    // renderRecentAccountsCategory,
    // renderRecentAccounts,
    renderItem,
  } = renders;

  return (
    <div className="main-admin-container">
      <div className="main-admin-container__board" style={{ height: '70rem', maxHeight: 'none' }}>
        <div className="title-and-more">
          <p className="title-and-more__title">게시판</p>
          {/* <Link to="/admin/board" className="title-and-more__showmore">
                더 보기
              </Link> */}
        </div>
        <div className="inner-category">
          {renderItem(true, [
            {
              title: '순번',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '제목',
              width: `50%`,
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '작성자',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '게시판',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '날짜',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '조회',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '추천',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '도구',
              width: '12rem',
              textAlign: 'center',
              paddingLeft: null,
            },
          ])}
        </div>
        {(function () {
          return Array.from(Array(9).keys()).map((i, index) => {
            return (
              <div key={index} className="inner-category">
                {renderItem(false, [
                  {
                    title: 9 - index,
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
                    width: `50%`,
                    textAlign: 'left',
                    paddingLeft: '2rem',
                  },
                  {
                    title: '관리자',
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    title: ['질문게시판', '자유게시판'][Math.round(Math.random())],
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    title: '22.10.11',
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    title: Math.round(Math.random() * 256),
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    title: Math.round(Math.random() * 16),
                    width: '10%',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                  {
                    isAdminTool: true,
                    title: '도구',
                    width: '12rem',
                    textAlign: 'center',
                    paddingLeft: null,
                  },
                ])}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default AdminCTF;
