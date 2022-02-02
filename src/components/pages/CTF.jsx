import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import forums from '../../apis/forums';
import { colorMainClassname } from './utils';

const CTF = () => {
    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));
    // Redux

    useEffect(() => {
        forums.get('/user').then((res) => console.log(res));
    }, []);

    return (
        <main className={colorMainClassname[seto.theme]}>
            <p className="en" style={{ fontSize: '2rem' }}>
                CTF page
            </p>
        </main>
    );
};

export default CTF;
