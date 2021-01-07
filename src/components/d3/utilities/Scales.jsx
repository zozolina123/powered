import { max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';

class Scales {
    constructor(data, dims, date) {
        this.setScales(data, dims, date);
    }

    setScales = (data, dims, date) => {
        date.setMinutes(0, 0, 0);
        this.xScale = scaleTime()
            .domain([date, new Date(date.getTime() + 23 * 60 * 60 * 1000)])
            .range([0, dims.innerWidth]);
        this.yScale = scaleLinear()
            .domain([0, max(data)])
            .range([dims.innerHeight, 0])
            .nice();
    };
}

export default Scales;
