import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MainItemCard from './feeds/MainItemCard';
import {
    colorMainClassname,
    colorMainFeedBackground,
    colorMainRecentNotice,
    colorMainRecentNoticeSmall,
    colorThemeContainerText,
    colorMainSection,
} from './utils';

export const translated = {
    section: {
        welcome: {
            title: ['CJU Security Circles', '청주대학교 정보보안 동아리', '清州大学安全团体'],
            subtitle: [
                '프로젝트에 즐거움을, 모두에게 기회를.',
                '프로젝트에 즐거움을, 모두에게 기회를.',
                '프로젝트에 즐거움을, 모두에게 기회를.',
            ],
        },

        notices: {
            title: ['Notices', '공지사항', '通知'],
        },

        recents: {
            title: ['Recent Posts', '최신글 모음', '最近的帖子'],
        },
    },
};

const Main = () => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    // const faker = require('@faker-js/faker');

    const ref = useRef([]);
    const [logo, setLogo] = useState('icon icon-white');
    const [tempDataRemoveThisLater, setTempDataRemoveThisLater] = useState({});

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
            if (seto.theme === 0) {
                if (shouldOriginal()) {
                    setLogo((state) => 'icon');
                } else {
                    setLogo((state) => 'icon icon-white');
                }
            }
        };

        window.addEventListener('scroll', funcScrollEvent);
        renderTempFromPlaceHolder();

        return () => {
            window.removeEventListener('scroll', funcScrollEvent);
        };
    }, []);

    const renderTempFromPlaceHolder = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // console.log(res.data);

        setTempDataRemoveThisLater((state) => res);
    };

    const renderAlly = () => {
        console.log(tempDataRemoveThisLater, Object.keys(tempDataRemoveThisLater).length);
        if (Object.keys(tempDataRemoveThisLater).length > 0) {
            // console.log('렌더시작');
            return tempDataRemoveThisLater.data.map((i, index) => {
                return (
                    <MainItemCard
                        key={index}
                        image=""
                        category={`${Math.round(Math.random())}`}
                        title={i.title}
                        subtitle={i.body}
                        profileImage=""
                        uploaderName="Jasmin Pay"
                        uploadedDate="2022-02-22"
                    />
                );
            });
        }
    };

    return (
        <main className={colorMainClassname[seto.theme]}>
            <div style={{ position: 'fixed', padding: '2rem', zIndex: '100' }}>
                <div className={logo} onClick={() => ref.current[0].scrollIntoView()}></div>
            </div>

            <section ref={(e) => (ref.current[0] = e)} className="section-welcome">
                <div className="section-welcome__back noselect">
                    <div className="symbol"></div>
                    <div className="title-wrap">
                        <h3 className="title">
                            <span className={seto.language === 1 ? '' : 'en'}>
                                {translated.section.welcome.title[seto.language]}
                            </span>
                        </h3>
                    </div>
                    <p className="subtitle">프로젝트에 즐거움을, 모두에게 기회를.</p>
                </div>
            </section>

            <section
                ref={(e) => (ref.current[1] = e)}
                className="section-notice"
                style={{ backgroundColor: colorMainSection[seto.theme] }}
            >
                <div className="section-notice__area area" style={{ padding: '2rem' }}>
                    <div className="container-big">
                        <h3 className="title" style={{ color: colorThemeContainerText[seto.theme] }}>
                            <span className={seto.language === 1 ? '' : 'en'}>
                                {translated.section.notices.title[seto.language]}
                            </span>
                        </h3>
                        <a className={colorMainRecentNotice[seto.theme]}>동아리 인원을 모집합니다</a>
                        <p className="title-date">2022년 2월 2일</p>
                    </div>
                    <div className="container-small">
                        <a className="container-small__notice">
                            <p className={colorMainRecentNoticeSmall[seto.theme]}>
                                이제 막 시작된 서비스입니다. 이제 막 시작된 서비스입니다.
                            </p>
                            <p className="container-small__notice-date">2022년 2월 1일</p>
                        </a>

                        <a className="container-small__notice">
                            <p className={colorMainRecentNoticeSmall[seto.theme]}>이제 막 시작된 서비스입니다.</p>
                            <p className="container-small__notice-date">2022년 1월 31일</p>
                        </a>
                    </div>
                </div>
            </section>

            <section ref={(e) => (ref.current[2] = e)} className={colorMainFeedBackground[seto.theme]}>
                <div className="area" style={{ padding: '2rem' }}>
                    <h3 className="title" style={{ color: colorThemeContainerText[seto.theme] }}>
                        <span className={seto.language === 1 ? '' : 'en'}>
                            {translated.section.recents.title[seto.language]}
                        </span>
                    </h3>

                    <div className="feed-items">{renderAlly()}</div>
                </div>
            </section>
        </main>
    );
};

export default Main;
