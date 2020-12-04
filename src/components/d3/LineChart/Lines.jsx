import { line } from 'd3-shape';
import { transition } from 'd3-transition';

class Lines {
    constructor(chart, data, scales) {
        this.transitionRef = transition;
        this.chart = chart;
        this.data = data;
        this.scales = scales;
        const date = new Date(Date.now());
        date.setMinutes(0, 0, 0);
        this.date = date;
        this.updateData(this.data);
    }

    updateData = (data, duration) => {
        this.data = data;
        this.lines = this.chart.selectAll('.lines').data([this.data]);
        this.lines
            .transition()
            .duration(1000)
            .attr(
                'd',
                line()
                    .x((d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
                    .y((d) => this.scales.yScale(d)),
            );

        this.enter();
    };

    enter = () => {
        this.lines
            .enter()
            .append('path')
            .attr('class', 'lines')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr(
                'd',
                line()
                    .x((d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
                    .y((d) => this.scales.yScale(d)),
            );

        this.exit();
    };

    exit = () => {
        this.lines.exit().remove();
    };

    updateScales = (scales) => {
        this.scales = scales;
        this.lines
            .transition()
            .duration(500)
            .attr(
                'd',
                line()
                    .x((d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
                    .y((d) => this.scales.yScale(d)),
            );
    };
}

export default Lines;
