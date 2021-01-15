import { select } from 'd3-selection';

import { Axes, Dimensions, Scales } from '../LineChart/utilities';
import Circles from './Circles';

class BarChart {
    constructor(domNodeCurrent, type) {
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
        this.type = type;
    }

    init = (data, dims) => {
        this.data = data;
        this.dims = new Dimensions(dims);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.scales = new Scales(this.data, this.dims, this.type);
        this.axes = new Axes(this.chart, this.scales, this.dims, this.type);
        this.circles = new Circles(this.chart, this.data, this.scales, this.type);
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims, this.type);
        this.axes.updateAxes(this.scales, this.dims, this.type);
        this.circles.updateScales(this.scales);
        this.circles.updateData(this.data);
    };

    updateData = (data) => {
        this.data = data;
        this.date = date;
        this.scales.setScales(this.data, this.dims, this.type);
        this.axes.updateAxes(this.scales, this.dims);
        this.circles.updateData(this.data);
    };
}

export default BarChart;
