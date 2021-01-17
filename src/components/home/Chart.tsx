import React, { useEffect, useRef, useState } from 'react';

import BarChart from '../d3/BarChart/BarChart';
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
    const [canvas, createCanvas] = useState({} as BarChart);
    const [vizInitialized, setVizInitialized] = useState(false);

    useEffect(() => {
        createCanvas(() => new BarChart(domNode.current, type));
    }, []);

    useEffect(() => {
        if (data.length > 1 && dims.width && vizInitialized === false) {
            canvas.init(data, dims);
            setVizInitialized(() => true);
        }
    }, [data, dims]);

    useEffect(() => {
        vizInitialized && canvas.updateDims(dims);
    }, [dims]);

    useEffect(() => {
        vizInitialized && canvas.updateData(data);
    }, [data]);

    return <div ref={domNode} style={{ display: 'grid', height: '300px' }} />;
}

export default withContext(Chart);
