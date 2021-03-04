class Tooltip {
    constructor(domNodeCurrent, data) {
        this.data = data;
        this.div = domNodeCurrent;
        this.div.attr('class', 'tooltip').style('opacity', 0);
    }

    mouseenter = (event, d) => {
        this.div.transition().duration(200).style('opacity', 0.9);
        this.div
            .html(d)
            .style('left', event.pageX + 'px')
            .style('top', event.pageY - 28 + 'px');
    };

    mouseout = () => this.div.transition().duration(200).style('opacity', 0);
}

export default Tooltip;
