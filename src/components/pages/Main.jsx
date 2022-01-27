import React, { useEffect, useRef, useState } from 'react';
import MainItemCard from './feeds/MainItemCard';

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
                document.documentElement.scrollTop > ref.current[0].offsetHeight - 20
                // &&
                // document.documentElement.scrollTop < ref.current[1].offsetTop + ref.current[1].offsetHeight - 20
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
                    <p className="subtitle">프로젝트에 즐거움을, 모두에게 기회를.</p>
                </div>
            </section>

            <section ref={(e) => (ref.current[1] = e)} className="section-notice">
                <div className="section-notice__area area" style={{ padding: '2rem' }}>
                    <div className="container-big">
                        <h3 className="title">공지사항</h3>
                        <a className="title-recent-most">동아리 인원을 모집합니다</a>
                        <p className="title-date">2022년 2월 2일</p>
                    </div>
                    <div className="container-small">
                        <a className="container-small__notice">
                            <p className="container-small__notice-title">
                                이제 막 시작된 서비스입니다. 이제 막 시작된 서비스입니다.
                            </p>
                            <p className="container-small__notice-date">2022년 2월 1일</p>
                        </a>

                        <a className="container-small__notice">
                            <p className="container-small__notice-title">이제 막 시작된 서비스입니다.</p>
                            <p className="container-small__notice-date">2022년 1월 31일</p>
                        </a>
                    </div>
                </div>
            </section>

            <section ref={(e) => (ref.current[2] = e)} className="section-feed">
                <div className="area" style={{ padding: '2rem' }}>
                    <h3 className="title">최신글 모음</h3>

                    <div className="feed-items">
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요. 세부 내용이 길어지면 점점점 처리하는 방향으로"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                        <MainItemCard
                            image=""
                            category="자유게시판"
                            title="Enter Title Here"
                            subtitle="서브 타이틀을 여기에 넣으세요"
                            profileImage=""
                            uploaderName="Jasmin Pay"
                            uploadedDate="2022-02-22"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;
