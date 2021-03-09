import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';

import { dayArray } from '../../../../api/ConsumpionDataAPI';
import { enLocale, roLocale } from '../../../../utils/intlHelpers';

class Axes {
    constructor(parent, scales, dims, type, locale) {
        const transitionRef = transition;
        this.parent = parent;
        this.type = type;
        this.locale = locale == 'en' ? enLocale : roLocale;
        this.createAxes(parent, scales, dims, type);
    }

    createAxes = (parent, scales, dims, type) => {
        this.scaleAxes(scales, dims, this.type);

        this.xAxisBottomG = parent
            .append('g')
            .attr('transform', `translate(0, ${dims.innerHeight})`)
            .call(this.xAxisBottom);
        this.yAxisLeftG = parent.append('g').attr('class', 'grid').call(this.yAxisLeft);
    };

    scaleAxes = (scales, dims) => {
        this.yAxisLeft = axisLeft().scale(scales.yScale).tickSize(-dims.innerWidth, 0, 0);
        this.xAxisBottom = axisBottom()
            .scale(scales.xScale)
            .tickSize(-dims.innerHeight)
            .tickFormat((d, i) => {
                let unit = dayArray;
                if (this.type == 'month') unit = this.locale.months;
                if (this.type == 'week') unit = this.locale.days;
                return unit[i];
            });
    };

    updateAxes = (scales, dims) => {
        this.scaleAxes(scales, dims);
        this.xAxisBottomG.transition().duration(1000).call(this.xAxisBottom);
        this.yAxisLeftG.transition().duration(1000).call(this.yAxisLeft);
    };
}

export default Axes;
