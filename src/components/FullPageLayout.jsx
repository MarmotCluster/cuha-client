import React from 'react';
import ReactDOM from 'react-dom';

const FullPageLayout = (props) => {
    return ReactDOM.createPortal(
        <div
            name="popup"
            onMouseDown={(e) => props.onMouseDown(e)}
            style={{
                zIndex: 100000,
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backgroundColor: props.visible
                    ? props.backgroundColor
                        ? props.backgroundColor
                        : 'rgba(0, 0, 0, 0.2)'
                    : 'transparent',
                transition: 'all .2s ease',
                pointerEvents: props.visible ? 'auto' : 'none',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                {props.children}
            </div>
        </div>,

        document.getElementById('popup')
    );
};

export default FullPageLayout;
