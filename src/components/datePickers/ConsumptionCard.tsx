import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { getAverage, getMax, getTotal, getTotalCost } from '../../utils/consumptionHelpers';

interface Props {
    data: number[];
}

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

export default function DetailsCard(props: Props): React.ReactElement {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const { data } = props;
    const peakValue = useMemo(() => getMax(data), [data]);
    const averageValue = useMemo(() => getAverage(data), [data]);
    const totalCost = useMemo(() => getTotalCost(data, 0.05), [data]);
    const totalConsumption = useMemo(() => getTotal(data), [data]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {formatMessage({ id: 'ConsumptionCard.consumptionSummary' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'ConsumptionCard.peakValue' }) + peakValue + ' kW'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'ConsumptionCard.averageValue' }) + averageValue + ' kW'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'ConsumptionCard.totalCost' }) + totalCost + ' lei'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'ConsumptionCard.totalConsumption' }) + totalConsumption + ' kW'}
                </Typography>
            </CardContent>
        </Card>
    );
}
