import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminBoard = ({ renders }) => {
  const { renderItem, requests } = renders;

  const [results, setResults] = useState(requests);

  useEffect(() => {
    setResults(requests);
  }, [requests]);

  /* filtering */
  const [filterForm, setFilterForm] = useState({
    option: 'title',
    body: '',
  });

  const onHandler = {
    select: function (e) {
      setFilterForm((state) => ({ ...state, option: e.target.value }));
    },
    body: function (e) {
      setFilterForm((state) => ({ ...state, body: e.target.value }));
    },

    submit: function (e) {
      console.log(filterForm);
    },
  };
  /* filtering */
  return (
    <div className="main-admin-container">
      <div className="main-admin-container__board" style={{ height: 'auto', maxHeight: 'none' }}>
        <div className="title-and-more" style={{ padding: '3.2rem', alignItems: 'center' }}>
          <p className="title-and-more__title">필터링</p>
          <div style={{ display: 'flex' }}>
            <select
              className="menu-container__section-form-input"
              name="gender"
              id="gender"
              style={{ padding: '1rem', outline: 'none', width: '8rem' }}
              onChange={(e) => onHandler.select(e)}
              value={filterForm.option}
            >
              <option value="title">제목</option>
              <option value="user">글쓴이</option>
            </select>
            <input
              type="text"
              name="search"
              autoComplete="off"
              onChange={(e) => onHandler.body(e)}
              value={filterForm.body}
              style={{ border: '1px solid #e0e0e0', outline: 'none', padding: '1rem', minWidth: '50rem' }}
            />
            <button
              type="button"
              onClick={() => onHandler.submit()}
              style={{ border: 'none', outline: 'none', padding: '1rem 2rem', marginLeft: '1rem' }}
            >
              검색
            </button>
          </div>
        </div>
      </div>

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
          if (results) {
            return results.map((i, index) => {
              return (
                <div key={index} className="inner-category">
                  {renderItem(false, [
                    {
                      title: i.id,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.title,
                      width: `50%`,
                      textAlign: 'left',
                      paddingLeft: '2rem',
                    },
                    {
                      title: i.name,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: {
                        notice: '공지사항',
                        free: '자유게시판',
                        question: '질문게시판',
                      }[i.category],
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.createdAt,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.views,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.like,
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
          }
        })()}
      </div>
    </div>
  );
};

export default AdminBoard;
