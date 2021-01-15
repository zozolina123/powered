import { transition } from 'd3-transition';

class Rectangles {
    constructor(chart, data, scales, type) {
        this.transitionRef = transition;
        this.chart = chart;
        this.data = data;
        this.type = type;
        this.scales = scales;
        this.updateData(this.data);
    }

    updateData = (data) => {};

    enter = () => {};

    exit = () => {};

    updateScales = (scales) => {};
}

export default Rectangles;
