import { max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';

class Scales {
    constructor(data, dims, date, type) {
        this.setScales(data, dims, date, type);
    }

    setScales = (data, dims, date, type) => {
        date.setHours(0, 0, 0, 0);
        const timeMultiplier = type === 'day' ? 23 * 60 * 60 * 1000 : (data.length - 1) * 24 * 60 * 60 * 1000;
        this.xScale = scaleTime()
            .domain([date, new Date(date.getTime() + timeMultiplier)])
            .range([0, dims.innerWidth]);
        this.yScale = scaleLinear()
            .domain([0, max(data)])
            .range([dims.innerHeight, 0])
            .nice();
    };
}

export default Scales;
