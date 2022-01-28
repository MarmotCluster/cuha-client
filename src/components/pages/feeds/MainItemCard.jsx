import React from 'react';
import { useSelector } from 'react-redux';
import {
    colorMainRecentPostItemBackground,
    colorMainRecentPostItemProfileBorderTop,
    colorMainRecentPostItemText,
} from '../utils';

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

    return (
        <a
            href="#"
            className="feed-items__item"
            style={{
                backgroundColor: colorMainRecentPostItemBackground[seto.theme],
                color: colorMainRecentPostItemText[seto.theme],
            }}
        >
            <div className="feed-items__item-image" style={makeImageURL()}></div>
            <div className="feed-items__item-container">
                <p className="feed-items__item-container__category">{props.category}</p>
                <p className="feed-items__item-container__title">{props.title}</p>
                <p className="feed-items__item-container__subtitle">{props.subtitle}</p>
            </div>
            <div
                className="feed-items__item-profile"
                style={{ borderTop: colorMainRecentPostItemProfileBorderTop[seto.theme] }}
            >
                <div className="feed-items__item-profile__left">
                    <div className="feed-items__item-profile-image" style={makeProfileImageURL()}></div>
                    <div className="feed-items__item-profile__text">
                        <p className="feed-items__item-profile-name">{props.uploaderName}</p>
                        <p className="feed-items__item-profile-date">2022-02-22</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default MainItemCard;
