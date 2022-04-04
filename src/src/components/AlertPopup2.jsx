import React from 'react';
import FullPageLayout from './FullPageLayout';

const AlertPopup2 = (props) => {
    const renderChild = () => {
        // if (props.visibie) {
        return (
            <div className="popup-message" onMouseDown={(e) => e.stopPropagation()}>
                <p className="popup-message__title">{props.title}</p>
                <div
                    className="popup-message__desc"
                    style={{ padding: '5rem', minHeight: '8rem', textAlign: 'center' }}
                >
                    {props.children}
                </div>
                <div className="popup-message-buttons">
                    <button type="button" className="popup-message__button" onClick={(e) => props.handlerCancel(e)}>
                        {props.dismissText}
                    </button>
                    <button
                        type={props.confirmButtonType === 'submit' ? 'submit' : 'button'}
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
        <FullPageLayout
            visible={props.visible}
            onMouseDown={(e) => {
                if (props.preventClickOuterToClose !== 'true') {
                    props.onMouseDown(e);
                }
            }}
        >
            {props.visible ? renderChild() : null}
        </FullPageLayout>
    );

    return null;
};

AlertPopup2.defaultProps = {
    title: 'title',
    desc: 'descriptions',
    dismissText: 'Dismiss',
    confirmText: 'Confirm',
};

export default AlertPopup2;
