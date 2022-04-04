import axios from 'axios';

const forums = axios.create({
    baseURL: 'http://175.205.6.23:8080/v1',

    // timeout: 8000,
});

forums.defaults.headers.patch['Content-Type'] = `application/json`;
forums.defaults.headers.post['Content-Type'] = 'application/json';

// forums.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default forums;
