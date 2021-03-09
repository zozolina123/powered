import React, { useEffect, useRef, useState } from 'react';

import { IPrice } from '../../../redux/ApiInterfaces';
import StackedBarChart from '../../d3/StackedBarChart/StackedBarChart';
import { withContext } from '../../utils/DimContext';
import { DimInterface } from '../../utils/UtilIntefaces';

interface Props {
    dims: DimInterface;
    data: IPrice[];
    labelText: {
        yLabel: string;
    };
}

function Chart({ data, dims, labelText }: Props) {
    const domNode = useRef(null);
    const [canvas, createCanvas] = useState<StackedBarChart>();
    const [vizInitialized, setVizInitialized] = useState(false);

    useEffect(() => {
        createCanvas(new StackedBarChart(domNode.current, labelText));
    }, []);

    useEffect(() => {
        if (data.length > 1 && dims.width && vizInitialized === false && canvas) {
            canvas.init(data, dims);
            setVizInitialized(() => true);
        }
    }, [data, dims]);

    useEffect(() => {
        vizInitialized && canvas && canvas.updateDims(dims);
    }, [dims]);

    useEffect(() => {
        vizInitialized && canvas && canvas.updateData(data);
    }, [data]);

    return <div ref={domNode} style={{ display: 'grid', height: '520px' }} />;
}

export default withContext(Chart);
