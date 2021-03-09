import { select } from 'd3-selection';
import { stack } from 'd3-shape';

import Rectangles from './Rectangles';
import { Axes, Dimensions, Labels, Scales } from './utilities';

class StackedBarChart {
    constructor(domNodeCurrent, labelText) {
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
        this.labelText = labelText;
    }

    init = (data, dims) => {
        this.data = data.slice(0, 11);
        const propertiesToFilter = ['furnizor', 'id', 'energieRegenerabila', 'tarifFinal', 'tva'];
        const smallData = data.slice(0, 11);
        const dataKeys = Object.keys(smallData[0]).filter((key) => !propertiesToFilter.includes(key));
        const series = stack()
            .keys(dataKeys)(smallData)
            .map((d) => (d.forEach((v) => (v.key = d.key)), d));
        this.series = series;
        this.dims = new Dimensions(dims);
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
        this.scales = new Scales(this.data, this.dims, this.series);
        this.axes = new Axes(this.chart, this.scales, this.dims);
        this.labels = new Labels(this.chart, this.scales, this.dims, this.labelText);
        this.bars = new Rectangles(this.chart, this.series, this.scales, this.dims);
        console.log(this.series);
        var legend = this.chart
            .append('g')
            .attr('class', 'legend')
            .attr('width', 50)
            .attr('height', 20)
            .selectAll('g')
            .data(this.series)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
                return 'translate(0,' + (-170 + i * 20) + ')';
            });

        legend
            .append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d) => {
                return this.scales.color(d.key);
            });

        legend
            .append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .attr('fill', 'currentColor')
            .text(function (d) {
                return d.key;
            });
    };

    updateDims = (newDims) => {
        this.dims.setDims(newDims);
        this.scales.setScales(this.data, this.dims, this.series);
        this.axes.updateAxes(this.scales, this.dims);
        this.labels.updateLabels(this.scales, this.dims);
        this.bars.updateScales(this.scales);
        this.bars.updateData(this.series);
    };

    updateData = (data) => {
        this.data = data.slice(0, 11);
        this.scales.setScales(this.data, this.dims, this.series);
        this.axes.updateAxes(this.scales, this.dims);
        this.bars.updateData(this.series);
    };
}

export default StackedBarChart;
