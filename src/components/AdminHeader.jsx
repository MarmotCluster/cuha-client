import React from 'react';

const AdminHeader = () => {
    const renderHeaderMenu = () => {
        let _list = [{ name: '통합' }, { name: '게시판' }, { name: '댓글' }, { name: '계정' }, { name: 'CTF' }];

        return _list.map((i, index) => {
            return (
                <div
                    className="header-admin__menu"
                    style={{
                        display: 'flex',
                        // flex: '1',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '6rem',
                        fontSize: '1.6rem',
                        fontWeight: '500',
                        backgroundColor: index === 0 ? '#e0e0e0' : 'transparent',
                    }}
                >
                    {i.name}
                </div>
            );
        });
    };

    if (window.location.pathname.indexOf('/admin') > -1) {
        return (
            <header style={{ position: 'fixed' }}>
                <div
                    style={{
                        width: '20rem',
                        height: 'calc(100vh - 8rem)',
                        marginTop: '8rem',
                        backgroundColor: 'white',
                        borderRadius: '0 1rem 0 0',
                        overflow: 'hidden',
                        boxShadow: '0 6px 6px rgba(0,0,0,16%)',
                        paddingTop: '6rem',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'scroll',
                    }}
                >
                    {renderHeaderMenu()}
                </div>
            </header>
        );
    }

    return null;
};

export default AdminHeader;
