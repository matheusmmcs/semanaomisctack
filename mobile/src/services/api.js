import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.20.15.190:3333'
});

export default api;