import React, { useEffect, useRef, useState } from 'react';

import LineChart from '../d3/LineChart/LineChart';
import { withContext } from '../utils/DimContext';
import { DimInterface } from '../utils/UtilIntefaces';

interface Props {
    dims: DimInterface;
    data: number[];
    date: Date;
    type: string;
}

function Chart({ dims, data, date, type = 'day' }: Props) {
    const domNode = useRef(null);
    const [canvas, createCanvas] = useState({} as LineChart);
    const [vizInitialized, setVizInitialized] = useState(false);

    useEffect(() => {
        createCanvas(() => new LineChart(domNode.current, type));
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
