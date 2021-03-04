import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';

class Scales {
    constructor(data, dims) {
        this.setScales(data, dims);
    }

    setScales = (data, dims) => {
        this.xScale = scaleBand().range([0, dims.innerWidth]).domain().padding(0.3);
        this.yScale = scaleLinear()
            .range([dims.innerHeight, 0])
            .domain([0, max(data)]);
    };
}

export default Scales;
