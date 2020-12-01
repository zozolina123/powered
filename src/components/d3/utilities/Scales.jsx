import { scaleLinear, scaleTime } from 'd3-scale';

class Scales {
    constructor(data, dims) {
        const date = new Date(Date.now());
        date.setMinutes(0, 0, 0);
        this.date = date;
        this.setScales(data, dims);
    }

    setScales = (data, dims) => {
        this.xScale = scaleTime()
            .domain([this.date, new Date(this.date.getTime() + 24 * 60 * 60 * 1000)])
            .range([0, dims.innerWidth]);
        this.yScale = scaleLinear().domain([0, 9]).range([dims.innerHeight, 0]);
    };
}

export default Scales;
