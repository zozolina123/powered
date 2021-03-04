import { select } from 'd3-selection';
import { stack } from 'd3-shape';

import Rectangles from './Rectangles';
import { Axes, Dimensions, Scales } from './utilities';

class StackedBarChart {
    constructor(domNodeCurrent) {
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
    }

    init = (data, dims) => {
        const propertiesToFilter = ['furnizor', 'id', 'energieRegenerabila', 'tarifFinal', 'tva'];
        const smallData = data.slice(0, 3);
        const dataKeys = Object.keys(smallData[0]).filter((key) => !propertiesToFilter.includes(key));
        const series = stack()
            .keys(dataKeys)(smallData)
            .map((d) => (d.forEach((v) => (v.key = d.key)), d));
        console.log(series);
        this.dims = new Dimensions(dims);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.scales = new Scales(this.data, this.dims);
        this.axes = new Axes(this.chart, this.scales, this.dims);
        this.bars = new Rectangles(this.chart, this.data, this.scales, this.dims);
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims);
        this.axes.updateAxes(this.scales, this.dims);
        this.bars.updateScales(this.scales);
        this.bars.updateData(this.data);
    };

    updateData = (data) => {
        this.data = data;
        this.scales.setScales(this.data, this.dims);
        this.axes.updateAxes(this.scales, this.dims);
        this.bars.updateData(this.data);
    };
}

export default StackedBarChart;
