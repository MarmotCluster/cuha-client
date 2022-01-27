import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import forums from '../../apis/forums';

const CTF = () => {
    const { accounts } = useSelector((state) => ({
        accounts: state.accounts,
    }));

    // const [data, setData]

    useEffect(() => {
        forums.get('/user').then((res) => console.log(res));
    }, []);

    return (
        <main className="main">
            <p className="en" style={{ fontSize: '2rem' }}>
                CTF page
            </p>
        </main>
    );
};

export default CTF;
