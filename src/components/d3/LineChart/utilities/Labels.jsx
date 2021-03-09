import { transition } from 'd3-transition';

class Labels {
    constructor(parent, scales, dims, type, labelText) {
        const transitionRef = transition;
        this.parent = parent;
        this.type = type;
        this.labelText = labelText;
        this.createLabels(parent, scales, dims, type);
    }

    createLabels = (parent, scales, dims, type) => {
        parent.selectAll('.labelX').remove();
        parent.selectAll('.labelY').remove();
        parent
            .append('text')
            .attr('class', 'labelX')
            .attr('fill', 'currentColor')
            .attr(
                'transform',
                'translate(' + dims.innerWidth / 2 + ' ,' + (dims.innerHeight + dims.margin.top + 5) + ')',
            )
            .style('text-anchor', 'middle')
            .text(this.labelText.xLabel);

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
            .selectAll('.labelX')
            .transition()
            .duration(1000)
            .attr(
                'transform',
                'translate(' + dims.innerWidth / 2 + ' ,' + (dims.innerHeight + dims.margin.top + 5) + ')',
            );

        this.parent
            .selectAll('.labelY')
            .transition()
            .duration(1000)
            .attr('y', 0 - dims.margin.left)
            .attr('x', 0 - dims.innerHeight / 2);
    };
}

export default Labels;
