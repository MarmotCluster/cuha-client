import axios from 'axios';

const forums = axios.create({
    baseURL: 'http://175.205.6.23:8080/v1',

    // timeout: 8000,
});

forums.defaults.headers.patch['Content-Type'] = `application/json`;
forums.defaults.headers.post['Content-Type'] = 'application/json';

export default forums;
