import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { transition } from 'd3-transition';

class ThePattern {
    constructor(domNodeCurrent) {
        this.innerHeight = 0;
        this.innerWidth = 0;
        this.svg = select(domNodeCurrent).append('svg');
        this.svg.attr('width', '100%').attr('height', '100%');
        this.margin = { top: 20, left: 30, bottom: 20, right: 30 };
        const date = new Date(Date.now());
        date.setMinutes(0, 0, 0);
        this.date = date;
    }

    init = (data, dims) => {
        this.setDims(dims); //<-----one
        this.setScales(); //<-------two
        this.chart = this.svg.append('g');
        this.chart.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
        this.chart.append('text').text(`height: ${dims.height}`);
        this.createAxes(); //<-----three

        this.updateData(data);
    };

    // first; set up dims, including inner dimensions as everything else hinges on these initial dimensions.
    setDims = (dims) => {
        this.dims = dims;
        this.innerHeight = this.dims.height - (this.margin.top + this.margin.bottom);
        this.innerWidth = this.dims.width - (this.margin.left + this.margin.right);
    };

    // second; set up scales using new dims
    setScales = () => {
        this.xScale = scaleTime()
            .domain([this.date, new Date(this.date.getTime() + 24 * 60 * 60 * 1000)])
            .range([0, this.innerWidth]);
        this.yScale = scaleLinear().domain([0, 9]).range([this.innerHeight, 0]);
    };

    // third; create axis groups using the following methods.
    createAxes = () => {
        this.scaleAxes();

        this.xAxisBottomG = this.chart
            .append('g')
            .attr('transform', `translate(0, ${this.innerHeight})`)
            .call(this.xAxisBottom);

        this.yAxisLeftG = this.svg
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(this.yAxisLeft);
    };

    updateAxes = () => {
        this.scaleAxes();
        this.xAxisBottomG.attr('transform', `translate(0, ${this.innerHeight})`).call(this.xAxisBottom);
        this.yAxisLeftG.call(this.yAxisLeft);
    };

    scaleAxes = () => {
        this.xAxisBottom = axisBottom(this.xScale).tickSize(-this.innerHeight);
        this.yAxisLeft = axisLeft(this.yScale).tickSize(-this.innerWidth);
    };

    updateData = (data) => {
        this.data = data;
        this.updateDims(this.dims);
        this.enter();
    };

    updateDims = (dims) => {
        const transitionRef = transition;

        this.setDims(dims);
        this.setScales();
        this.updateAxes();
        this.circles = this.chart.selectAll('.myCircle').data([this.data]);
        this.circles
            .transition()
            .duration(500)
            .attr(
                'd',
                line()
                    .x((d, i) => this.xScale(Date.now() + i * 60 * 60 * 1000))
                    .y((d) => this.yScale(d)),
            );
    };

    enter = () => {
        this.circles
            .enter()
            .append('path')
            .attr('class', 'myCircle')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr(
                'd',
                line()
                    .x((d, i) => this.xScale(Date.now() + i * 60 * 60 * 1000))
                    .y((d) => this.yScale(d)),
            );
        // this.circles
        //     .enter()
        //     .append('circle')
        //     .attr('class', 'myCircle')
        //     .attr('r', 10)
        //     .attr('cx', (d, i) => this.xScale(i))
        //     .attr('cy', (d) => this.yScale(d))
        //     .attr('fill', 'green');

        this.exit();
    };

    exit = () => {
        this.circles.exit().remove();
    };
}

export default ThePattern;
