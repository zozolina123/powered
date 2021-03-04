import API from './API';
import { priceDataURL } from './routes';

class PriceDataAPI {
    fetchPriceData = async () => {
        const data = await API.get(priceDataURL);
        return data;
    };
}

export default new PriceDataAPI();
