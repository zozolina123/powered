import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPriceData } from '../../redux/reducers/priceDataSlice';
import { fetchOverviewData } from '../pages/consumptionDataSlice';

interface Props {
    children: JSX.Element;
}

function DataWrapper({ children }: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOverviewData());
        dispatch(fetchPriceData());
    }, [dispatch]);

    return children;
}

export default DataWrapper;
