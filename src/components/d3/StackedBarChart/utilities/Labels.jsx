import { transition } from 'd3-transition';

class Labels {
    constructor(parent, scales, dims, labelText) {
        const transitionRef = transition;
        this.parent = parent;
        this.labelText = labelText;
        this.createLabels(parent, scales, dims);
    }

    createLabels = (parent, scales, dims) => {
        parent
            .append('text')
            .attr('class', 'labelY')
            .attr('fill', 'currentColor')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - dims.margin.left)
            .attr('x', 0 - dims.innerHeight / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text(this.labelText.yLabel);
    };

    updateLabels = (scales, dims) => {
        this.parent
            .selectAll('.labelY')
            .transition()
            .duration(1000)
            .attr('y', 0 - dims.margin.left)
            .attr('x', 0 - dims.innerHeight / 2);
    };
}

export default Labels;
