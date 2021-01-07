import axios from 'axios';

import { baseURL } from './routes';

export default axios.create({
    baseURL,
});
