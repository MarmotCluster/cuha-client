import React from 'react';
import { useSelector } from 'react-redux';
import {
    colorMainRecentPostItemBackground,
    colorMainRecentPostItemProfileBorderTop,
    colorMainRecentPostItemText,
} from '../utils';

import { Link } from 'react-router-dom';

export const translated = {
    boards: {
        types: [
            ['Free', '자유게시판', 'Free'],
            ['Discussion', '질문게시판', 'Discussion'],
        ],
    },
};

const MainItemCard = (props) => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    const makeImageURL = () => {
        if (props.image === null || props.image.length <= 0) {
            return null;
        } else {
            return {
                backgroundImage: `url('${props.image}')`,
            };
        }
    };

    const makeProfileImageURL = () => {
        if (props.profileImage === null || props.profileImage.length <= 0) {
            return null;
        } else {
            return {
                backgroundImage: `url('${props.profileImage}')`,
            };
        }
    };

    const getBoardType = () => {
        return translated.boards.types[Number(props.category)][seto.language];
    };

    const renderImageIfExists = () => {
        if (makeImageURL() !== null) {
            return <div className="feed-items__item-image" style={makeImageURL()}></div>;
        }
    };

    return (
        <div
            href="#"
            className="feed-items__item"
            style={{
                backgroundColor: colorMainRecentPostItemBackground[seto.theme],
                color: colorMainRecentPostItemText[seto.theme],
            }}
        >
            <Link to={`/post/${props.postId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {renderImageIfExists()}
                <div className="feed-items__item-container">
                    <p className="feed-items__item-container__category">
                        <span className={seto.language === 1 ? '' : 'en'}>{getBoardType()}</span>
                    </p>
                    <p className="feed-items__item-container__title">
                        <span className={seto.language === 1 ? '' : 'en'}>{props.title}</span>
                    </p>
                    <p className="feed-items__item-container__subtitle">
                        <span className={seto.language === 1 ? '' : 'en'}>{props.subtitle}</span>
                    </p>
                </div>
            </Link>
            <Link to="/member/root" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                    className="feed-items__item-profile"
                    style={{ borderTop: colorMainRecentPostItemProfileBorderTop[seto.theme] }}
                >
                    <div className="feed-items__item-profile__left">
                        <div className="feed-items__item-profile-image" style={makeProfileImageURL()}></div>
                        <div className="feed-items__item-profile__text">
                            <p className="feed-items__item-profile-name">
                                <span className={seto.language === 1 ? '' : 'en'}>{props.uploaderName}</span>
                            </p>
                            <p className="feed-items__item-profile-date">
                                <span className={seto.language === 1 ? '' : 'en'}>2022-02-22</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MainItemCard;
