import axios from 'axios';

import { baseURL } from './routes';

const headers = {
    'Content-Type': 'application/json',
};

export default axios.create({
    baseURL,
    headers,
});
