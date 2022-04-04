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

  useEffect(() => {
    const ueResizeHandler = (e) => {
      window.document.documentElement.clientWidth >= 900 ? setRenderSort(true) : setRenderSort(false);
    };

    window.addEventListener('resize', ueResizeHandler);

    return () => {
      window.removeEventListener('resize', ueResizeHandler);
    };
  }, []);

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ padding: '2rem' }}>
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
                    return Array.from(Array(5).keys()).map((i, index) => {
                      return (
                        <div className="checkbox-item">
                          <div className="checkbox-item-draws">
                            <input className="checkbox-item-input" type="checkbox" onChange={(e) => console.log(e.target.checked)} />
                            <div className="checkbox-item-draws__checkbox"></div>
                            <div className="checkbox-item-draws__title">항목 이름</div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className="main-challenges-container-left__block">
                  <p className="sort-name">난이도</p>
                  {(function () {
                    return Array.from(Array(5).keys()).map((i, index) => {
                      return (
                        <div className="checkbox-item">
                          <div className="checkbox-item-draws">
                            <input className="checkbox-item-input" type="checkbox" onChange={(e) => console.log(e.target.checked)} />
                            <div className="checkbox-item-draws__checkbox"></div>
                            <div className="checkbox-item-draws__title">항목 이름</div>
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
              <Link to="/challenge/create" className="admin-add-challenge">
                관리자 권한으로 문제 추가하기
              </Link>
              <div className="my-status"></div>
              <div className="filter-box">
                <input type="text" name="filter" placeholder="필터 ..." />
                <div className="ico-search"></div>
              </div>
              <div className="challenge-list">
                {renderSort ? (
                  <>
                    <div className="challenge-list-half">
                      {(function () {
                        return Array.from(Array(4).keys()).map((i, index) => {
                          return (
                            <div className="challenge-list__item">
                              {/* <p className="challenge-list__item-level">{i * 2 + 1}</p> */}
                              <div className="challenge-list__item-texts">
                                <p className="title">문제제목</p>
                                <p className="status">
                                  <span>30명 도전</span> | <span>9명 통과</span>
                                </p>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    <div className="challenge-list-half">
                      {(function () {
                        return Array.from(Array(4).keys()).map((i, index) => {
                          return (
                            <div className="challenge-list__item">
                              {/* <p className="challenge-list__item-level">{i * 2 + 1}</p> */}
                              <div className="challenge-list__item-texts">
                                <p className="title">문제제목</p>
                                <p className="status">
                                  <span>30명 도전</span> | <span>9명 통과</span>
                                </p>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </>
                ) : (
                  <div className="challenge-list-full">
                    {(function () {
                      return Array.from(Array(4).keys()).map((i, index) => {
                        return (
                          <div className="challenge-list__item">
                            {/* <p className="challenge-list__item-level">{i * 2 + 1}</p> */}
                            <div className="challenge-list__item-texts">
                              <p className="title">문제제목</p>
                              <p className="status">
                                <span>30명 도전</span> | <span>9명 통과</span>
                              </p>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default CTF;
