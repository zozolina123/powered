import { transition } from 'd3-transition';

class Circles {
    constructor(chart, data, date, scales, tooltip) {
        this.transitionRef = transition;
        this.chart = chart;
        this.data = data;
        this.scales = scales;
        this.tooltip = tooltip;
        date.setMinutes(0, 0, 0);
        this.date = date;
        this.updateData(this.data, this.date);
    }

    updateData = (data, date) => {
        this.data = data;
        this.date = date;
        this.circles = this.chart.selectAll('.circles').data(this.data);

        this.circles
            .transition()
            .duration(1000)
            .attr('cx', (d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
            .attr('cy', (d) => this.scales.yScale(d));

        this.enter();
    };

    enter = () => {
        this.circles
            .enter()
            .append('circle')
            .attr('class', 'circles')
            .attr('opacity', '0.7')
            .attr('fill', 'blue')
            .attr('stroke', 'none')
            .attr('r', 4)
            .attr('cx', (d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
            .attr('cy', (d) => this.scales.yScale(d))
            .on('mouseenter', (event, d, i) => this.tooltip.mouseenter(event, d))
            .on('mouseout', () => this.tooltip.mouseout());

        this.exit();
    };

    exit = () => {
        this.circles.exit().remove();
    };

    updateScales = (scales) => {
        this.scales = scales;

        this.circles
            .transition()
            .duration(500)
            .attr('cx', (d, i) => this.scales.xScale(new Date(this.date.getTime() + i * 60 * 60 * 1000)))
            .attr('cy', (d) => this.scales.yScale(d));
    };
}

export default Circles;
