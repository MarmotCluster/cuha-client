import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import forums from '../../../apis/forums';

const AdminAccount = ({ renders }) => {
  const { renderItem, requests } = renders;

  const [results, setResults] = useState(requests);

  useEffect(() => {
    setResults(requests);
  }, [requests]);

  /* filtering */
  const [filterForm, setFilterForm] = useState({
    option: 'username',
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
              <option value="username">아이디</option>
              <option value="user">이름</option>
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
          <p className="title-and-more__title">계정</p>
          <Link to="/admin" className="title-and-more__showmore">
            CSV 출력
          </Link>
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
              title: '프로필',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '아이디',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '이름',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '학과',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '학번',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '전화',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '성별',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '이메일',
              width: '10%',
              textAlign: 'center',
              paddingLeft: null,
            },
            {
              title: '분류',
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
                      title: index + 1,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: (
                        <div
                          className="inner-category-item__profile"
                          style={{
                            display: 'inline-block',
                            backgroundImage: `url(${forums.defaults.baseURL}/members/profiles/${i.profileImage})`,
                          }}
                        ></div>
                      ),
                      width: `10%`,
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.username,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.name,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: (function () {
                        switch (i.department) {
                          case 'DIGITAL_SECURITY':
                            return '디지털보안전공';
                          default:
                            return i.department;
                        }
                      })(),
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.studentId,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.phoneNumber,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.isMale ? '남자' : '여자',
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: i.email,
                      width: '10%',
                      textAlign: 'center',
                      paddingLeft: null,
                    },
                    {
                      title: (function () {
                        switch (i.role.role) {
                          case 'ROLE_MEMBER':
                            return '일반회원';
                          default:
                            return i.role.role;
                        }
                      })(),
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

export default AdminAccount;
