import React from 'react';

const MainRecentCard = ({ name, division, imageUrl }) => {
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

MainRecentCard.defaultProps = {
    name: '이름',
    division: '역할군',
    imageUrl: null,
};

export default MainRecentCard;
