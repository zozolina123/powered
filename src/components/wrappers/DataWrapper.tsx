import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchOverviewData } from '../../redux/actions/consumptionDataActions';
import { fetchPriceData } from '../../redux/actions/priceDataActions';

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
