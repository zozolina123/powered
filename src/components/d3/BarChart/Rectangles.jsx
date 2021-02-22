import { transition } from 'd3-transition';

class Rectangles {
    constructor(chart, data, scales, dims, type, unit) {
        this.transitionRef = transition;
        this.chart = chart;
        this.data = data;
        this.dims = dims;
        this.type = type;
        this.scales = scales;
        this.unit = unit;
        this.updateData(this.data);
    }

    updateData = (data) => {
        this.data = data;
        this.bars = this.chart.selectAll('.bar').data(this.data);
        this.text = this.chart.selectAll('.value').data(this.data);
        const days = this.unit;

        this.bars
            .transition()
            .duration(1000)
            .attr('x', (g, i) => this.scales.xScale(days[i]))
            .attr('y', (dataVal) => this.scales.yScale(dataVal))
            .attr('height', (dataVal) => this.dims.innerHeight - this.scales.yScale(dataVal))
            .attr('width', this.scales.xScale.bandwidth());

        this.text
            .transition()
            .duration(1000)
            .attr('x', (a, i) => this.scales.xScale(days[i]) + this.scales.xScale.bandwidth() / 2)
            .attr('y', (a) => this.scales.yScale(a) + 30);

        this.enter();
    };

    enter = () => {
        const chart = this.chart;
        const dims = this.dims;
        const scales = this.scales;
        const text = this.text;
        const days = this.unit;
        this.bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (g, i) => scales.xScale(days[i]))
            .attr('y', (dataVal) => scales.yScale(dataVal))
            .attr('height', (dataVal) => dims.innerHeight - scales.yScale(dataVal))
            .attr('width', scales.xScale.bandwidth())
            .on('mouseenter', function (event, actual, i) {
                chart.selectAll('.value').attr('opacity', 0);
                chart
                    .select(this.node)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a, id) => scales.xScale(days[id]) - 5)
                    .attr('width', scales.xScale.bandwidth() + 10);

                const y = scales.yScale(actual);

                const line = chart
                    .append('line')
                    .attr('color', 'red')
                    .attr('id', 'limit')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', dims.innerWidth)
                    .attr('y2', y);

                text.enter()
                    .append('text')
                    .attr('class', 'divergence')
                    .attr('x', (a, i) => scales.xScale(days[i]) + scales.xScale.bandwidth() / 2)
                    .attr('y', (a) => scales.yScale(a) + 30)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                        const divergence = (a - actual).toFixed(1);
                        let text = '';
                        if (divergence > 0) text += '+';
                        text += `${divergence}`;

                        return idx !== i ? text : '';
                    });
            })
            .on('mouseleave', function (val, i) {
                chart.selectAll('.value').attr('opacity', 1);

                chart
                    .select(this.node)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => scales.xScale(days[i]))
                    .attr('width', scales.xScale.bandwidth());

                chart.selectAll('#limit').remove();
                chart.selectAll('.divergence').remove();
            });

        // this.text
        //     .enter()
        //     .append('text')
        //     .attr('class', 'value')
        //     .attr('x', (a, i) => this.scales.xScale(days[i]) + this.scales.xScale.bandwidth() / 2)
        //     .attr('y', (a) => this.scales.yScale(a) + 30)
        //     .attr('text-anchor', 'middle')
        //     .text((dataVal) => Math.round(dataVal));

        this.exit();
    };

    exit = () => {
        this.bars.exit().remove();
        this.text.exit().remove();
    };

    updateScales = (scales) => {
        this.scales = scales;
        const days = this.unit;
        this.text
            .transition()
            .duration(500)
            .attr('x', (a, i) => this.scales.xScale(days[i]) + this.scales.xScale.bandwidth() / 2)
            .attr('y', (a) => this.scales.yScale(a) + 30)
            .attr('text-anchor', 'middle')
            .text((dataVal) => dataVal);

        this.bars
            .transition()
            .duration(500)
            .attr('x', (g, i) => this.scales.xScale(days[i]))
            .attr('y', (dataVal) => this.scales.yScale(dataVal))
            .attr('height', (dataVal) => this.dims.innerHeight - this.scales.yScale(dataVal))
            .attr('width', this.scales.xScale.bandwidth());
    };
}

export default Rectangles;
