import { axisBottom, axisLeft } from 'd3-axis';

class Axes {
    constructor(parent, scales, dims, type) {
        this.type = type;
        this.createAxes(parent, scales, dims, type);
    }

    createAxes = (parent, scales, dims) => {
        this.scaleAxes(scales, dims, this.type);

        this.xAxisBottomG = parent
            .append('g')
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .call(this.xAxisBottom);
        this.yAxisLeftG = parent.append('g').attr('class', 'grid').call(this.yAxisLeft);
    };

    scaleAxes = (scales, dims) => {
        this.yAxisLeft = axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat('');
        this.xAxisBottom = axisBottom().scale(scales.xScale).tickSize(-dims.innerHeight);
    };

    updateAxes = (scales, dims) => {
        this.scaleAxes(scales, dims);
        this.xAxisBottomG = parent
            .append('g')
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .transition()
            .duration(1000)
            .call(this.xAxisBottom);

        this.yAxisLeftG = parent.append('g').attr('class', 'grid').transition().duration(1000).call(this.yAxisLeft);
    };
}

export default Axes;
