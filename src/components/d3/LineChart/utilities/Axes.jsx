import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat, timeFormatDefaultLocale } from 'd3-time-format';

import { enLocale, roLocale } from '../../../../utils/intlHelpers';

class Axes {
    constructor(parent, scales, dims, type, locale) {
        this.type = type;
        this.parent = parent;
        const localeTimeFormat = locale == 'en' ? timeFormatDefaultLocale(enLocale) : timeFormatDefaultLocale(roLocale);
        this.createAxes(parent, scales, dims, type);
    }

    createAxes = (parent, scales, dims) => {
        this.scaleAxes(scales, dims, this.type);

        this.xAxisBottomG = parent
            .append('g')
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .call(this.xAxisBottom);

        this.yAxisLeftG = parent.append('g').call(this.yAxisLeft);
    };

    scaleAxes = (scales, dims) => {
        const format = this.type === 'day' ? '%H' : '%a %d';
        this.xAxisBottom = axisBottom().scale(scales.xScale).tickSize(-dims.innerHeight).tickFormat(timeFormat(format));
        this.type === 'week' && this.xAxisBottom.ticks(7);
        this.yAxisLeft = axisLeft().scale(scales.yScale).tickSize(-dims.innerWidth);
    };

    updateAxes = (scales, dims) => {
        this.scaleAxes(scales, dims);
        this.xAxisBottomG
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .transition()
            .duration(1000)
            .call(this.xAxisBottom);
        this.yAxisLeftG.transition().duration(1000).call(this.yAxisLeft);
    };
}

export default Axes;
