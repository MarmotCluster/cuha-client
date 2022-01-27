import axios from 'axios';

const forums = axios.create({
    // baseURL: 'http://localhost:3001/',
    baseURL: 'http://59.31.59.43:8080/',
});

forums.defaults.headers.common['Context-Type'] = `application/json`;

export default forums;
