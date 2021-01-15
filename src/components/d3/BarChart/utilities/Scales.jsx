import { scaleBand, scaleLinear } from 'd3-scale';

class Scales {
    constructor(data, dims, type) {
        this.setScales(data, dims, type);
    }

    setScales = (data, dims, type) => {
        this.xScale = scaleBand()
            .range([0, dims.innerWidth])
            .domain(['SUnday', 'Monday', 'Thursday', ' Wensday', 'Thuesday', 'Friday', ' Saturday'])
            .padding(0.3);
        this.yScale = scaleLinear()
            .range([dims.innerHeight, 0])
            .domain([0, max(data)]);
    };
}

export default Scales;
