import React, { useEffect, useRef, useState } from 'react';

const Main = () => {
    const ref = useRef([]);
    const [logo, setLogo] = useState('icon icon-white');

    useEffect(() => {
        const funcScrollEvent = (e) => {
            // console.log('scrolled', document.documentElement.scrollTop, ref.current[0].offsetHeight);
            if (document.documentElement.scrollTop > ref.current[0].offsetHeight - 20) {
                setLogo((state) => 'icon');
            } else {
                setLogo((state) => 'icon icon-white');
            }
        };

        window.addEventListener('scroll', funcScrollEvent);

        return () => window.removeEventListener('scroll', funcScrollEvent);
    }, []);

    return (
        <main className="main">
            <div style={{ position: 'fixed', padding: '2rem' }}>
                <div className={logo} onClick={() => ref.current[0].scrollIntoView()}></div>
            </div>

            <section ref={(e) => (ref.current[0] = e)} className="section-welcome">
                <div className="section-welcome__back noselect">
                    <div className="symbol"></div>
                    <div className="title-wrap">
                        <h3 className="title">청주대학교 정보보안 동아리</h3>
                    </div>
                    <p className="subtitle">공식 웹사이트에 오신것을 환영합니다.</p>
                </div>
            </section>

            <section className="section-about">
                <div className="section-about__back">
                    <p className="inner-text">
                        <span className="inner-text-title">
                            CUHA 는 청주대학교
                            <br />
                            학생들이 만든
                            <br />
                            <span>정보 보안 동아리</span>
                            입니다.
                        </span>
                    </p>
                    <p className="inner-desc">
                        <span>
                            우리 동아리는 정보 보안에 관련한 내용을 공부하고, 공유하며 서로 발전해 나가기 위해
                            창립되었습니다.
                        </span>
                        <br />
                        <span>주로 다루는 공부 내용은 프로그래밍과 전반적인 보안에 관한 것입니다.</span>
                        <span>
                            공부를 통해서 <b>CTF및 보안 관련 대회 참가</b>를 목표하고 있습니다.
                        </span>
                    </p>
                </div>
            </section>
            {/* <span>
                우리 동아리는 또한 창의적이고(Creative), 특별하며(Unique), 편향된 지식과 실력이 아닌 모든 것을 조화롭게
                갖춘(Harmonious), 어떤 일을 하더라도 열심인(Avid) 해커가 되기 위해 노력하고 있습니다.
            </span> */}
        </main>
    );
};

export default Main;
