import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';

const Board = (props) => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));
    //Redux

    const { type } = useParams();

    useEffect(() => {
        console.log(type);
        console.log(props);
    }, []);

    const renderBoard = () => {
        switch (type) {
            case 'free':
                return <div style={{ fontSize: '2.4rem' }}>자유게시판</div>;
            case 'question':
                return <div style={{ fontSize: '2.4rem' }}>질문게시판</div>;
            default:
                return <div style={{ fontSize: '2.4rem' }}>모든 게시판 최신글 한번에 보기</div>;
        }
    };

    return <main className={colorMainClassname[seto.theme]}>{renderBoard()}</main>;
};

export default Board;
