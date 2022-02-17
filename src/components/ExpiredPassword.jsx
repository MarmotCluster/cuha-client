import React from 'react';
import ReactDOM from 'react-dom';

export const Child = () => {
    return (
        <div
            style={{
                zIndex: '100000',
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.2)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <p style={{ color: '#ffcccc', fontSize: '1.6rem' }}>비밀번호를 변경한지 180일이 지났습니다.</p>
                <input type="text" name="id" />
                <input type="password" name="pw" />
                <button>비밀번호 변경</button>
            </div>
        </div>
    );
};

const ExpiredPassword = () => {
    return ReactDOM.createPortal(<Child />, document.getElementById('popup'));
};

export default ExpiredPassword;
