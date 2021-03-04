import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConsumpionDataAPI from '../../api/ConsumpionDataAPI';
import PriceDataAPI from '../../api/PriceDataAPI';
import { fetchPriceData, priceDataLoaded } from '../../redux/reducers/priceDataSlice';
import { fetchOverviewData, overviewDataLoaded } from '../pages/consumptionDataSlice';

interface Props {
    children: JSX.Element;
}

function DataWrapper({ children }: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOverviewData());
        dispatch(fetchPriceData());
        ConsumpionDataAPI.fetchOverviewConsumptionData().then((res) => dispatch(overviewDataLoaded(res)));
        PriceDataAPI.fetchPriceData().then((res) => dispatch(priceDataLoaded(res)));
    }, [dispatch]);

    return children;
}

export default DataWrapper;
