import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';

const PostView = () => {
    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));

    const params = useParams();

    return <main className={colorMainClassname[seto.theme]}></main>;
};

export default PostView;
