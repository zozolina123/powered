import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchOverviewData } from '../../redux/actions/consumptionDataActions';

interface Props {
    children: JSX.Element;
}

function OverviewDataWrapper({ children }: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOverviewData());
    }, [dispatch]);

    return children;
}

export default OverviewDataWrapper;