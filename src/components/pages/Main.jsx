import React from 'react';

const Main = () => {
    return (
        <main className="main">
            {/* <p className="en" style={{ fontSize: '2rem' }}>
                Hello world
            </p>
            <p>Hello World</p> */}

            <section style={{ padding: '2rem' }}>
                <div className="logo"></div>
            </section>
            <section style={{ color: 'white', marginTop: '4rem' }}>
                <div className="listbox base-bg">
                    <h3 className="listbox-title">최근에 업로드된 글</h3>
                    <p className="listbox-subtitle">자유게시판</p>
                </div>

                <div className="listbox base-bg">
                    <h3 className="listbox-title">최근에 업로드된 글</h3>
                    <p className="listbox-subtitle">질문게시판</p>
                </div>
            </section>
        </main>
    );
};

export default Main;
