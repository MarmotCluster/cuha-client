import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import forums from '../../apis/forums';
import { colorMainClassname } from './utils';

const CTF = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const [renderSort, setRenderSort] = useState(window.document.documentElement.clientWidth >= 900);
  const [isOnRequestChallenges, setIsOnRequestChallenges] = useState(true);
  const [requests, setRequests] = useState([]);

  const [filters, setFilters] = useState({
    type: {
      FORENSIC: false,
      REVERSING: false,
      SYSTEM: false,
      WEB: false,
      MISC: false,
    },
    tier: {
      BRONZE: false,
      SILVER: false,
      GOLD: false,
      PLATINUM: false,
      DIAMOND: false,
    },
    byTitle: '',
  });

  const setFiltersCustomed = (e, type) => {
    // console.log(e.target, type);s
    setFilters((state) => {
      let _res = {
        ...filters[type],
        [e.target.name]: e.target.checked,
      };

      return { ...state, [type]: _res };
    });
  };

  useEffect(() => {
    const ueResizeHandler = (e) => {
      window.document.documentElement.clientWidth >= 900 ? setRenderSort(true) : setRenderSort(false);
    };

    window.addEventListener('resize', ueResizeHandler);

    // console.log(forums.defaults.baseURL);

    // forums
    //   .get('/problems', { params: { page: 0, size: 20 } })
    //   .then((res) => {
    //     // console.log(`데이터 불러오기 완료`, res.data);
    //     setRequests([...res.data]);
    //   })
    //   .finally((i) => {
    //     setIsOnRequestChallenges(false);
    //   });

    return () => {
      window.removeEventListener('resize', ueResizeHandler);
    };
  }, []);

  useEffect(() => {
    //필터값이 바뀔 때 마다 axios 다시 찍어 보내기
    // console.log(filters);
    const requestLink = (function () {
      let __type = Object.keys(filters.type).filter((i) => filters.type[i] === true);

      return '/problems';
    })();

    let sortProblemType = String(Object.keys(filters.type).filter((i) => filters.type[i] === true));
    let sortTier = String(Object.keys(filters.tier).filter((i) => filters.tier[i] === true));

    forums
      .get('/problems', {
        params: {
          page: 0,
          size: 20,
          problemTypes: sortProblemType.length > 0 ? sortProblemType : null,
          tiers: sortTier.length > 0 ? sortTier : null,
          title: filters.byTitle.length > 0 ? filters.byTitle : null,
        },
      })
      .then((res) => {
        // console.log(`데이터 불러오기 완료`, res.data);
        setRequests([...res.data]);
      })
      .finally((i) => {
        setIsOnRequestChallenges(false);
      });
  }, [filters]);

  const renderRequests = () => {
    let formula = function (i, index) {
      return (
        <Link
          key={index}
          to={i.problemId ? `/challenge/view/${i.problemId}` : '/'}
          className="challenge-list__item"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/img-challenge-banner_${String(i.tier).toLocaleLowerCase()}.png)`,
          }}
        >
          <div className="challenge-list__item-texts">
            <p className="title">{i.title ? i.title : 'undefined'}</p>
            <p className="status">
              {/* <span>30명 도전</span> | <span>9명 통과</span> */}
              <span>
                {i.score ? i.score : '0'} 포인트 증정 | {i.problemType}
              </span>
            </p>
          </div>
        </Link>
      );
    };

    if (requests.length > 0) {
      if (renderSort) {
        let filtered = {
          first: requests.filter((i, index) => index % 2 === 0),
          last: requests.filter((i, index) => index % 2 === 1),
        };

        return Object.keys(filtered).map((i, index) => {
          return (
            <div className="challenge-list-half" key={index}>
              {(function (e) {
                // console.log(e);
                return e.map((j, jndex) => {
                  {
                    return formula(j, jndex);
                  }
                });
              })(filtered[i])}
            </div>
          );
        });
      } else {
        return (
          <div className="challenge-list-full">
            {(function () {
              console.log(requests);
              return requests.map((i, index) => {
                // console.log(i);
                return formula(i, index);
              });
            })()}
          </div>
        );
      }
    } else {
      if (isOnRequestChallenges) {
        return <p>로딩 중...</p>;
      } else {
        return <p>아직 준비된 도전과제가 없어요.</p>;
      }
    }
  };

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ padding: '2rem' }}>
        {/* <input type="checkbox" onChange={(e) => console.log(e.target.checked)} /> */}
        <div className="main-challenges">
          <div
            className="main-challenges-banner"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/img-challenge-banner.png)`,
            }}
          >
            <p className="main-challenges-banner__title">Challenges</p>
            <p className="main-challenges-banner__subtitle">for Capture the Flag</p>
          </div>

          <section className="main-challenges-container">
            {renderSort ? (
              <div className="main-challenges-container-left">
                <div className="main-challenges-container-left__block">
                  <p className="sort-name">분류</p>
                  {(function () {
                    let _navi = {
                      FORENSIC: '포렌식',
                      REVERSING: '리버싱',
                      SYSTEM: '시스템해킹',
                      WEB: '웹해킹',
                      MISC: '기타',
                    };

                    return Object.keys(_navi).map((i, index) => {
                      return (
                        <div className="checkbox-item" key={index}>
                          <div className="checkbox-item-draws">
                            <input
                              className="checkbox-item-input"
                              type="checkbox"
                              name={i}
                              checked={filters.type[i]}
                              onChange={(e) => setFiltersCustomed(e, 'type')}
                            />
                            <div className="checkbox-item-draws__checkbox"></div>
                            <div className="checkbox-item-draws__title">{_navi[i]}</div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className="main-challenges-container-left__block">
                  <p className="sort-name">난이도</p>
                  {(function () {
                    let _navi = {
                      BRONZE: '브론즈',
                      SILVER: '실버',
                      GOLD: '골드',
                      PLATINUM: '플레티넘',
                      DIAMOND: '다이아몬드',
                    };

                    return Object.keys(_navi).map((i, index) => {
                      return (
                        <div className="checkbox-item" key={index}>
                          <div className="checkbox-item-draws">
                            <input
                              className="checkbox-item-input"
                              type="checkbox"
                              name={i}
                              checked={filters.tier[i]}
                              onChange={(e) => setFiltersCustomed(e, 'tier')}
                            />
                            <div className="checkbox-item-draws__checkbox"></div>
                            <div className="checkbox-item-draws__title">{_navi[i]}</div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ) : null}

            <div
              className="main-challenges-container-right"
              style={
                renderSort
                  ? null
                  : {
                      marginLeft: '0',
                      width: '100%',
                    }
              }
            >
              {accounts.isAdmin ? (
                <>
                  <Link to="/challenge/create" className="admin-add-challenge">
                    관리자 권한으로 문제 추가하기
                  </Link>
                </>
              ) : null}
              <div className="my-status">
                <p>
                  환영합니다, <span className="my-status__username">관리자</span>님.
                </p>
                <p>누적 보유 포인트 1000점으로 1위에 있습니다.</p>
                <Link to="/ranking" className="my-status__btn">
                  리더보드
                </Link>
              </div>
              <div className="filter-box">
                <input
                  type="text"
                  name="filter"
                  placeholder="필터 ..."
                  value={filters.byTitle}
                  onChange={(e) => setFilters((state) => ({ ...state, byTitle: e.target.value }))}
                />
                <div className="ico-search"></div>
              </div>
              <div className="challenge-list">{renderRequests()}</div>
            </div>
          </section>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default CTF;
