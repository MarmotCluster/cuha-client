import forums from '../apis/forums';
import history from '../history';

export const fetchAccount = (_id, pw) => async (dispatch) => {
    let _data = {
        username: _id,
        password: pw,
    };

    const res = await forums.post(`/login`, JSON.stringify(_data));

    console.log(res);

    dispatch({
        type: 'FETCH_ACCOUNT',
        payload: res,
    });

    // const { id, accessToken } = res.data;

    // if (res.data.length > 0) {
    //     console.log(id, accessToken);
    //     if (res.data.pw === pw) {
    //         console.log('account found. sign in succeed!');
    //         dispatch({
    //             type: 'FETCH_ACCOUNT',
    //             payload: { isSignedIn: true, userId: res.data.id, userAccessToken: res.data.accessToken },
    //         });
    //         history.back();
    //     }
    //     // } else {
    //     //     dispatch({ type: 'FETCH_ACCOUNT', payload: { isSignedIn: false, userId: null, userAccessToken: null } });
    //     // }
    // }

    // forums
    //     .get(`/accounts`, {
    //         params: {
    //             id: _id,
    //         },
    //     })
    //     .then((res) => {
    //         const { id, accessToken } = res.data;

    //         if (res.data.length > 0) {
    //             console.log(id, accessToken);
    //             if (res.data.pw === pw) {
    //                 console.log('account found. sign in succeed!');
    //                 dispatch({
    //                     type: 'FETCH_ACCOUNT',
    //                     payload: { isSignedIn: true, userId: res.data.userId, userAccessToken: res.data.accessToken },
    //                 });
    //                 history.back();
    //             }
    //             // } else {
    //             //     dispatch({ type: 'FETCH_ACCOUNT', payload: { isSignedIn: false, userId: null, userAccessToken: null } });
    //             // }
    //         }
    //     })
    //     .catch((err) => console.log(err));
};
