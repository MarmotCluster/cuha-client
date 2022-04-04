import React from 'react';
import { Link } from 'react-router-dom';

const AdminAll = ({ renders }) => {
  const {
    renderRecentPostsCategory,
    renderRecentPosts,
    renderRecentCommentsCategory,
    renderRecentComments,
    renderRecentAccountsCategory,
    renderRecentAccounts,
  } = renders;

  return (
    <div className="main-admin-container">
      <div className="main-admin-container__board">
        <div className="title-and-more">
          <p className="title-and-more__title">게시판 최신글</p>
          <Link to="/admin/board" className="title-and-more__showmore">
            더 보기
          </Link>
        </div>
        <div className="inner-category">{renderRecentPostsCategory()}</div>
        {renderRecentPosts()}
      </div>
      <div
        style={{
          display: 'flex',
          width: 'calc(100% - 24rem)',
          height: 'auto',
          // backgroundColor: 'blue',
          marginTop: '4rem',
          paddingBottom: '4rem',
          marginLeft: '24rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            boxShadow: '0 0 4px rgba(0,0,0,5%)',
            borderRadius: '1rem',
            width: '60%',
            height: '36.8rem',
            // maxHeight: '36.8rem',
          }}
        >
          <div className="title-and-more">
            <p className="title-and-more__title">최근 댓글</p>
            <Link to="/admin/comment" className="title-and-more__showmore">
              더 보기
            </Link>
          </div>
          <div className="inner-category">{renderRecentCommentsCategory()}</div>
          {renderRecentComments()}
        </div>
        <div
          style={{
            backgroundColor: 'white',
            boxShadow: '0 0 4px rgba(0,0,0,5%)',
            borderRadius: '1rem 0 0 1rem',
            marginLeft: '4rem',
            width: '40%',
            height: '36.8rem',
            // maxHeight: '36.8rem',
          }}
        >
          <div className="title-and-more">
            <p className="title-and-more__title">사용자 계정</p>
            <Link to="/admin/account" className="title-and-more__showmore">
              더 보기
            </Link>
          </div>
          <div className="inner-category">{renderRecentAccountsCategory()}</div>
          {renderRecentAccounts()}
        </div>
      </div>
    </div>
  );
};

export default AdminAll;
