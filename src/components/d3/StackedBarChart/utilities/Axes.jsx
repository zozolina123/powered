import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';

class Axes {
    constructor(parent, scales, dims) {
        const transitionRef = transition;
        this.createAxes(parent, scales, dims);
    }

    createAxes = (parent, scales, dims) => {
        this.scaleAxes(scales, dims);

        this.xAxisBottomG = parent
            .append('g')
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .call(this.xAxisBottom);
        this.yAxisLeftG = parent.append('g').attr('class', 'grid').call(this.yAxisLeft);
    };

    scaleAxes = (scales, dims) => {
        this.yAxisLeft = axisLeft().scale(scales.yScale).tickSize(-dims.innerWidth, 0, 0);
        this.xAxisBottom = axisBottom().scale(scales.xScale).tickSize(-dims.innerHeight);
    };

    updateAxes = (scales, dims) => {
        this.scaleAxes(scales, dims);
        this.xAxisBottomG.transition().duration(1000).call(this.xAxisBottom);
        this.yAxisLeftG.transition().duration(1000).call(this.yAxisLeft);
    };
}

export default Axes;
