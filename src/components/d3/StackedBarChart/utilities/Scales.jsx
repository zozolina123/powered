import { max } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeSpectral } from 'd3-scale-chromatic';

class Scales {
    constructor(data, dims, series) {
        this.setScales(data, dims, series);
    }

    setScales = (data, dims, series) => {
        this.xScale = scaleBand()
            .range([0, dims.innerWidth])
            .domain(data.map((d) => d.furnizor))
            .padding(0.3);
        this.yScale = scaleLinear()
            .range([dims.innerHeight, 0])
            .domain([0, max(series, (d) => max(d, (d) => d[1]))]);
        this.color = scaleOrdinal()
            .domain(series.map((d) => d.key))
            .range(schemeSpectral[series.length])
            .unknown('#ccc');
    };
}

export default Scales;
