import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Board = (props) => {
    const { type } = useParams();

    useEffect(() => {
        console.log(type);
    }, []);

    const renderBoard = () => {
        switch (type) {
            case 'free':
                return <div style={{ fontSize: '2.4rem' }}>자유게시판</div>;
            case 'question':
                return <div style={{ fontSize: '2.4rem' }}>질문게시판</div>;
            default:
                return <div style={{ fontSize: '2.4rem' }}>잘못된 경로입니다.</div>;
        }
    };

    return <main className="main">{renderBoard()}</main>;
};

export default Board;
