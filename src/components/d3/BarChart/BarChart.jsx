import { select } from 'd3-selection';

import { dayArray, monthsArray, weekArray } from '../../../api/ConsumpionDataAPI';
import Rectangles from './Rectangles';
import { Axes, Dimensions, Labels, Scales } from './utilities';

class BarChart {
    constructor(domNodeCurrent, type, labelText, locale) {
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
        this.type = type;
        this.labelText = labelText;
        this.locale = locale;
        this.measureUnit = dayArray;
        if (type == 'month') this.measureUnit = monthsArray;
        else if (type === 'week') this.measureUnit = weekArray;
    }

    init = (data, dims) => {
        this.data = data;
        this.dims = new Dimensions(dims);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.scales = new Scales(this.data, this.dims, this.type, this.measureUnit);
        this.axes = new Axes(this.chart, this.scales, this.dims, this.type, this.locale);
        this.labels = new Labels(this.chart, this.scales, this.dims, this.type, this.labelText);
        this.bars = new Rectangles(this.chart, this.data, this.scales, this.dims, this.type, this.measureUnit);
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims, this.type, this.measureUnit);
        this.axes.updateAxes(this.scales, this.dims, this.type);
        this.labels.updateLabels(this.scales, this.dims, this.type);
        this.bars.updateScales(this.scales);
        this.bars.updateData(this.data);
    };

    updateData = (data) => {
        this.data = data;
        this.scales.setScales(this.data, this.dims, this.type, this.measureUnit);
        this.axes.updateAxes(this.scales, this.dims);
        this.bars.updateData(this.data);
    };
}

export default BarChart;
