import React, { useEffect, useRef, useState } from 'react';

import BarChart from '../../d3/BarChart/BarChart';
import LineChart from '../../d3/LineChart/LineChart';
import { withContext } from '../../utils/DimContext';
import { DimInterface } from '../../utils/UtilIntefaces';

interface Props {
    dims: DimInterface;
    data: number[];
    date: Date;
    type: 'day' | 'month' | 'week';
    chartType: 'LineChart' | 'BarChart';
}

function Chart({ dims, data, date, type = 'day', chartType = 'LineChart' }: Props) {
    const domNode = useRef(null);
    const [canvas, createCanvas] = useState({} as BarChart | LineChart);
    const [vizInitialized, setVizInitialized] = useState(false);

    useEffect(() => {
        createCanvas(() =>
            chartType == 'LineChart' ? new LineChart(domNode.current, type) : new BarChart(domNode.current, type),
        );
    }, []);

    useEffect(() => {
        if (data.length > 1 && dims.width && vizInitialized === false) {
            canvas.init(data, dims, date);
            setVizInitialized(() => true);
        }
    }, [data, dims]);

    useEffect(() => {
        vizInitialized && canvas.updateDims(dims);
    }, [dims]);

    useEffect(() => {
        vizInitialized && canvas.updateData(data, date);
    }, [data]);

    return <div ref={domNode} style={{ display: 'grid', height: '300px' }} />;
}

export default withContext(Chart);
