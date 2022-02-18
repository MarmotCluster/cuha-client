import React from 'react';
import FullPageLayout from './FullPageLayout';

const AlertPopup = (props) => {
    const renderChild = () => {
        // if (props.visibie) {
        return (
            <div className="popup-message" onMouseDown={(e) => e.stopPropagation()}>
                <p className="popup-message__title">{props.title}</p>
                <p className="popup-message__desc" style={{ padding: '5rem', minHeight: '8rem', textAlign: 'center' }}>
                    {props.desc}
                </p>
                <div className="popup-message-buttons">
                    <button type="button" className="popup-message__button" onClick={(e) => props.handlerCancel(e)}>
                        {props.dismissText}
                    </button>
                    <button
                        type="button"
                        className={`popup-message__button ${
                            props.confirmType === 'positive'
                                ? 'popup-message__button-positive'
                                : 'popup-message__button-negative'
                        }`}
                        style={{ color: 'white' }}
                        onClick={() => props.handlerConfirm()}
                    >
                        {props.confirmText}
                    </button>
                </div>
            </div>
        );
        // }
    };

    return (
        <FullPageLayout visible={props.visible} onMouseDown={(e) => props.onMouseDown(e)}>
            {props.visible ? renderChild() : null}
        </FullPageLayout>
    );

    return null;
};

AlertPopup.defaultProps = {
    title: 'title',
    desc: 'descriptions',
    dismissText: 'Dismiss',
    confirmText: 'Confirm',
};

export default AlertPopup;
