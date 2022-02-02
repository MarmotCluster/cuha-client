import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddUser = (props) => {
    const navigate = useNavigate();

    const global = useSelector((state) => ({
        seto: state.seto,
    }));

    useEffect(() => {
        if (!global.seto.isAdmin) {
            navigate('/');
        }
    }, [global.seto.isAdmin]);

    if (global.seto.isAdmin === true) {
        return <main className="main">AddUser</main>;
    }

    return <div>{`:(`}</div>;
};
export default AddUser;
