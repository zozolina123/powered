import api from './api';
import { priceDataURL } from './routes';

class PriceDataAPI {
    fetchPriceData = async () => {
        const data = await api.get(priceDataURL);
        return data;
    };
}

export default new PriceDataAPI();
