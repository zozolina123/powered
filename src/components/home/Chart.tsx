import React, { useEffect, useRef, useState } from 'react';

import LineChart from '../d3/LineChart/LineChart';
import { withContext } from '../utils/DimContext';
import { DimInterface } from '../utils/UtilIntefaces';

interface Props {
    dims: DimInterface;
    data: number[];
}

function Chart({ dims, data }: Props) {
    const domNode = useRef(null);
    const [canvas, createCanvas] = useState({} as LineChart);
    const [vizInitialized, setVizInitialized] = useState(false);

    useEffect(() => {
        createCanvas(() => new LineChart(domNode.current));
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
