import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';
import forums from '../../apis/forums';
import { buildSpotInNumber } from '../../utils';

const Ranking = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const { postId } = useParams();

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    forums.get(`/members`, { params: { page: 0, size: 20, sort: 'score,desc' } }).then((res) => {
      // console.log(res);
      setRequests([...res.data]);
    });
  }, []);

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem', padding: '2rem 0', zoom: '0.8' }}>
        <div className="main-ranking">
          <div className="main-ranking-top3 main-ranking-default-bg">
            <div className="main-ranking-top3__bookmark"></div>
            {(function () {
              if (requests.length > 0) {
                let top3 = requests.filter((i, index) => index < 3);
                let styles = [
                  {
                    className: 'small',
                    tier: 'bronze',
                    rank: 3,
                  },
                  {
                    className: 'big',
                    tier: 'gold',
                    rank: 1,
                  },
                  {
                    className: 'small',
                    tier: 'silver',
                    rank: 2,
                  },
                ];

                return styles.map((i, index) => {
                  return (
                    <Link
                      to={`/member/${top3[i.rank - 1].username}`}
                      key={index}
                      className={`main-ranking-top3__profile main-ranking-top3__${i.className}`}
                      style={{
                        backgroundImage: top3[i.rank - 1].profileUrl
                          ? `url('${forums.defaults.baseURL}/profiles/${top3[i.rank - 1].profileUrl}')`
                          : `url('${process.env.PUBLIC_URL}/images/no-profile.svg')`,
                        // backgroundColor: 'red',
                      }}
                    >
                      <p className={`rank rank-${i.tier}`}>{i.rank}</p>
                    </Link>
                  );
                });
              }
            })()}
          </div>

          <div className="main-ranking-dummy" style={{ height: '2rem' }}></div>
          <div className="main-ranking-others main-ranking-default-bg">
            <p className="main-ranking-others__title">이하 순위</p>
            <div className="main-ranking-others__items">
              {(function () {
                if (requests.length > 0) {
                  let filtered = requests.filter((i, index) => index >= 3);
                  // console.log(filtered);

                  return filtered.map((i, index) => {
                    console.log(i);
                    return (
                      <Link to={`/member/${i.username}`} key={index} className="main-ranking-others__items-item">
                        <p className="rank">{index + 4}</p>
                        <div
                          className="profile"
                          style={{
                            backgroundImage: i.profileUrl
                              ? `url('${forums.defaults.baseURL}/profiles/${i.profileUrl}')`
                              : `url('${process.env.PUBLIC_URL}/images/no-profile.svg')`,
                          }}
                        ></div>
                        <div className="texts">
                          <p className="texts-username">{i.name}</p>
                          <p className="texts-point">{buildSpotInNumber(i.score)} pt</p>
                        </div>
                      </Link>
                    );
                  });
                }
              })()}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default Ranking;
