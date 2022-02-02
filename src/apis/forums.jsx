import axios from 'axios';

const forums = axios.create({
    // baseURL: 'http://localhost:3001/',
    baseURL: 'http://175.205.6.23:8080/v1',
});

forums.defaults.headers.common['Context-Type'] = `application/json`;

export default forums;
