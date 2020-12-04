import { select } from 'd3-selection';

import { Axes, Dimensions, Scales } from '../utilities';
import Circles from './Circles';
import Lines from './Lines';
import Tooltip from './Tooltip';

class LineChart {
    constructor(domNodeCurrent) {
        this.tooltipDiv = select(domNodeCurrent).append('div');
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
    }

    init = (data, dims) => {
        this.data = data;
        this.dims = new Dimensions(dims);
        this.scales = new Scales(this.data, this.dims);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.axes = new Axes(this.chart, this.scales, this.dims);
        this.lines = new Lines(this.chart, this.data, this.scales);
        this.tooltip = new Tooltip(this.tooltipDiv, this.data);
        this.circles = new Circles(this.chart, this.data, this.scales, this.tooltip);
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims);
        this.axes.updateAxes(this.scales, this.dims);
        this.lines.updateScales(this.scales);
        this.circles.updateScales(this.scales);
        this.lines.updateData(this.data);
        this.circles.updateData(this.data);
    };

    updateData = (data) => {
        this.data = data;
        this.lines.updateData(this.data);
        this.circles.updateData(this.data);
    };
}

export default LineChart;
