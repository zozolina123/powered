import { transition } from 'd3-transition';

class Rectangles {
    constructor(chart, data, scales, dims) {
        this.transitionRef = transition;
        this.chart = chart;
        this.data = data;
        this.dims = dims;
        this.scales = scales;
        this.updateData(this.data);
    }

    updateData = (newData) => {
        this.data = newData;
        const { scales, data, chart } = this;
        this.groups = chart
            .append('g')
            .attr('class', 'mainGroup')
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'barPart')
            .attr('fill', (d) => scales.color(d.key));
        this.bars = this.groups.selectAll('rect').data((d) => d);

        this.enter();
    };

    enter = () => {
        const scales = this.scales;
        this.bars
            .enter()
            .append('rect')
            .attr('x', (d, i) => scales.xScale(d.data.furnizor))
            .attr('y', (d) => scales.yScale(d[1]))
            .attr('height', (d) => scales.yScale(d[0]) - scales.yScale(d[1]))
            .attr('width', scales.xScale.bandwidth());

        this.exit();
    };

    exit = () => {
        this.bars.exit().remove();
        this.groups.exit().remove();
    };

    updateScales = (scales) => {
        this.scales = scales;
        this.bars
            .transition()
            .duration(500)
            .attr('x', (d, i) => scales.xScale(d.data.furnizor))
            .attr('y', (d) => scales.yScale(d[1]))
            .attr('height', (d) => scales.yScale(d[0]) - scales.yScale(d[1]))
            .attr('width', scales.xScale.bandwidth());

        this.chart.selectAll('.mainGroup').remove();
    };
}

export default Rectangles;
