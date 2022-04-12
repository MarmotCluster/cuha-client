import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';

const Ranking = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const { postId } = useParams();

  const navigate = useNavigate();

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem', padding: '2rem 0' }}>
        <div className="main-ranking">
          <div className="main-ranking-top3 main-ranking-default-bg">
            <div className="main-ranking-top3__bookmark"></div>
            <div
              className="main-ranking-top3__profile main-ranking-top3__small"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no-profile.svg)` }}
            >
              <p className="rank rank-bronze">3</p>
            </div>
            <div
              className="main-ranking-top3__profile main-ranking-top3__big"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no-profile.svg)` }}
            >
              <p className="rank rank-gold">1</p>
            </div>
            <div
              className="main-ranking-top3__profile main-ranking-top3__small"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/no-profile.svg)` }}
            >
              <p className="rank rank-silver">2</p>
            </div>
          </div>

          <div className="main-ranking-dummy" style={{ height: '2rem' }}></div>
          <div className="main-ranking-others main-ranking-default-bg">
            <p className="main-ranking-others__title">이하 순위</p>
            <div className="main-ranking-others__items">
              {(function () {
                return [4, 5, 6, 7, 8, 9, 10].map((i) => {
                  return (
                    <div className="main-ranking-others__items-item">
                      <p className="rank">{i}</p>
                      <div className="profile"></div>
                      <div className="texts">
                        <p className="texts-username">Am i Wrong</p>
                        <p className="texts-point">1,320 pt</p>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ranking;
