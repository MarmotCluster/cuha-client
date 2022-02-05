import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { lookupUser } from '../../actions';
import forums from '../../apis/forums';
import SimpleErrorPage from '../SimpleErrorPage';
import { colorMainClassname } from './utils';

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

    const [isUserExist, SetIsUserExist] = useState(false);
    const [userData, setUserData] = useState({});
    // useLocals

    useEffect(() => {
        const { username } = param;

        if (accounts.userAccessToken !== null) {
            setUserData((state) => jwtDecode(accounts.userAccessToken));
        } else if (username.length > 0) {
            // reduxLookupUser(param.username);
            forums
                .post('/members', JSON.stringify({ username }))
                .then((res) => {
                    console.log(res);
                    SetIsUserExist((state) => true);
                })
                .catch((err) => console.log(err));
        }
    });

    if (isUserExist) {
        return (
            <main className={colorMainClassname[seto.theme]}>
                User <p>{userData.username}</p>
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
