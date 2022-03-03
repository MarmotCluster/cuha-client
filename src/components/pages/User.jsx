import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { lookupUser } from '../../actions';
import forums from '../../apis/forums';
import SimpleErrorPage from '../SimpleErrorPage';
import { colorMainClassname } from './utils';

import { Link } from 'react-router-dom';

const User = () => {
    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));

    const dispatch = useDispatch();

    // const reduxLookupUser = (username) => dispatch(lookupUser(username));
    // Redux

    const param = useParams();
    // Parameter

    const [isUserExist, SetIsUserExist] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    // useLocals

    const hashDepartment = (val) => {
        switch (val) {
            case 'DIGITAL_SECURITY':
                return '디지털보안전공';
            default:
                return val;
        }
    };

    useEffect(() => {
        const { username } = param;

        forums.get(`/members`).then((res) => {
            console.log(res);
            setUserInfo((state) => res.data);
        });
    }, []);

    if (isUserExist) {
        return (
            <main className={colorMainClassname[seto.theme]}>
                <div className="main-user">
                    <div className="area">
                        <section className="section-profile">
                            <div
                                className="section-profile__profileImage"
                                style={{
                                    backgroundImage: userInfo.profileFilename
                                        ? `url(${forums.defaults.baseURL}/members/profiles/${userInfo.profileFilename})`
                                        : `url(${process.env.PUBLIC_URL}/images/no-profile.svg)`,
                                }}
                            ></div>
                            <div className="section-profile__textsContainer">
                                <p className="section-profile__textsContainer-username">{userInfo.name}</p>
                                <p className="section-profile__textsContainer-shortIntroduce">
                                    {hashDepartment(userInfo.department)}
                                </p>

                                <div className="section-profile__textsContainer__tools">
                                    <Link to="/" className="section-profile__textsContainer__tools-button noselect">
                                        출석체크하기
                                    </Link>
                                    <Link
                                        to="/editmember/root"
                                        className="section-profile__textsContainer__tools-button noselect"
                                    >
                                        내 정보 수정
                                    </Link>
                                </div>
                            </div>
                        </section>
                        <section className="section-status">
                            <div className="item">
                                <p className="section-status__dynamic">13</p>
                                <p className="section-status__static">Posts</p>
                            </div>
                            <div className="item">
                                <p className="section-status__dynamic">109</p>
                                <p className="section-status__static">Commands</p>
                            </div>

                            <div className="item">
                                <p className="section-status__dynamic">7</p>
                                <p className="section-status__static">Attended</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div
                className={seto.language === 1 ? '' : 'en'}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: 'calc(100vh - 5.8rem)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.4rem',
                }}
            >
                <h1>{`:(`}</h1>
                <p>일치하는 사용자 정보가 없습니다.</p>
            </div>
        </main>
    );
};

export default User;
