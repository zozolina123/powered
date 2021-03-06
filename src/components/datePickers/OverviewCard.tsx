import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { dayArray, monthsArray, weekArray } from '../../api/ConsumpionDataAPI';
import { getAverage, getLoHiComparison, getMaxIndex, getMinIndex } from '../../utils/consumptionHelpers';

interface Props {
    data: number[];
    type: 'day' | 'month' | 'week';
}

const arrayTypes = {
    day: dayArray,
    month: monthsArray,
    week: weekArray,
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '90%',
            marginTop: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                width: `calc(100% - ${theme.spacing(1)}px)`,
                margin: theme.spacing(1),
            },
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);

export default function OverviewCard(props: Props): React.ReactElement {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const { data, type } = props;
    const timeArray = arrayTypes[type];
    const averageConsumption = useMemo(() => getAverage(data), [data]);
    const highestConsumptionTime = useMemo(() => getMaxIndex(data), [data]);
    const lowestConsumptionTime = useMemo(() => getMinIndex(data), [data]);
    const loHiComparison = useMemo(() => getLoHiComparison(data), [data]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {formatMessage({ id: 'OverviewCard.overviewSummary' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'OverviewCard.averageConsumption' }) + averageConsumption + ' kW'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'OverviewCard.highestConsumption' }) + timeArray[highestConsumptionTime]}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'OverviewCard.lowestConsumption' }) + timeArray[lowestConsumptionTime]}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'OverviewCard.loHiComparison' }) + loHiComparison + '%'}
                </Typography>
            </CardContent>
        </Card>
    );
}
