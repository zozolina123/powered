import { select } from 'd3-selection';

import { Axes, Dimensions, Scales } from '../utilities';
import Circles from './Circles';
import Lines from './Lines';
import Tooltip from './Tooltip';

class LineChart {
    constructor(domNodeCurrent, type) {
        this.tooltipDiv = select(domNodeCurrent).append('div');
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
        this.type = type;
    }

    init = (data, dims, date) => {
        this.data = data;
        this.date = date;
        this.dims = new Dimensions(dims);
        this.scales = new Scales(this.data, this.dims, this.date, this.type);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.axes = new Axes(this.chart, this.scales, this.dims, this.type);
        this.lines = new Lines(this.chart, this.data, this.date, this.scales, this.type);
        this.tooltip = new Tooltip(this.tooltipDiv, this.data);
        this.circles = new Circles(this.chart, this.data, this.date, this.scales, this.tooltip, this.type);
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims, this.date, this.type);
        this.axes.updateAxes(this.scales, this.dims, this.type);
        this.lines.updateScales(this.scales);
        this.circles.updateScales(this.scales);
        this.lines.updateData(this.data, this.date);
        this.circles.updateData(this.data, this.date);
    };

    updateData = (data, date) => {
        this.data = data;
        this.date = date;
        this.scales.setScales(this.data, this.dims, this.date, this.type);
        this.axes.updateAxes(this.scales, this.dims);
        this.lines.updateData(this.data, this.date);
        this.circles.updateData(this.data, this.date);
    };
}

export default LineChart;
