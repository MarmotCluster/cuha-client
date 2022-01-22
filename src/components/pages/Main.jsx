import React, { useEffect, useRef, useState } from 'react';

export const Card = ({ name, division, imageUrl }) => {
    return (
        <div className="card noselect">
            <div className="card-profile" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="card-text">
                <div className="card-text__name">{name}</div>
                <div className="card-text__division">{division}</div>
            </div>
        </div>
    );
};

Card.defaultProps = {
    name: '이름',
    division: '역할군',
};

const Main = () => {
    const faker = require('@faker-js/faker');

    const ref = useRef([]);
    const [logo, setLogo] = useState('icon icon-white');

    useEffect(() => {
        function shouldOriginal() {
            return (
                document.documentElement.scrollTop > ref.current[0].offsetHeight - 20 &&
                document.documentElement.scrollTop < ref.current[1].offsetTop + ref.current[1].offsetHeight - 20
            );
        }

        const funcScrollEvent = (e) => {
            // console.log(
            //     'scrolled',
            //     document.documentElement.scrollTop,
            //     // ref.current[1].offsetHeight,
            //     // ref.current[1].offsetTop
            //     ref.current[1].offsetTop + ref.current[1].offsetHeight - 20
            // );
            if (shouldOriginal()) {
                setLogo((state) => 'icon');
            } else {
                setLogo((state) => 'icon icon-white');
            }
        };

        window.addEventListener('scroll', funcScrollEvent);

        return () => {
            window.removeEventListener('scroll', funcScrollEvent);
        };
    }, []);

    return (
        <main className="main">
            <div style={{ position: 'fixed', padding: '2rem', zIndex: '100' }}>
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

            {/* <section ref={(e) => (ref.current[1] = e)} className="section-about">
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

            <section className="section-idea">
                <div className="section-idea__back">
                    <div className="section-idea__back-container">
                        <p className="title">우리는 다음 해커가 되기 위해 노력하고 있습니다:</p>
                        <div className="ideas">
                            <div className="ideas-idea">
                                <div className="ideas-idea__icon icon_c"></div>
                                <p className="ideas-idea__text noselect">창의적인</p>
                            </div>
                            <div className="ideas-idea">
                                <div className="ideas-idea__icon icon_u"></div>
                                <p className="ideas-idea__text noselect">특별한</p>
                            </div>
                            <div className="ideas-idea">
                                <div className="ideas-idea__icon icon_h"></div>
                                <p className="ideas-idea__text noselect">조화로운</p>
                            </div>
                            <div className="ideas-idea">
                                <div className="ideas-idea__icon icon_a"></div>
                                <p className="ideas-idea__text noselect">열심인</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-members">
                <div className="section-members__back">
                    <div className="section-members__back-container">
                        <p className="title">우리 구성원을 소개합니다.</p>
                        <div className="cards">
                            <div className="cards-slide">
                                <Card
                                    name="김태원"
                                    division="동아리 회장"
                                    imageUrl={`${process.env.PUBLIC_URL}/images/cuha_ico.svg`}
                                />
                                <Card name="김태형" division="동아리 회장" imageUrl={faker.image.avatar()} />
                                <Card name="서종찬" division="동아리 회장" imageUrl={faker.image.avatar()} />

                                <Card name="권순범" division="동아리 구성원" imageUrl={faker.image.avatar()} />
                                <Card name="김재윤" division="동아리 구성원" imageUrl={faker.image.avatar()} />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </main>
    );
};

export default Main;
