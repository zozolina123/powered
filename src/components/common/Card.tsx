import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useIntl } from 'react-intl';

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

export default function DetailsCard() {
    const classes = useStyles();
    const { formatMessage } = useIntl();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {formatMessage({ id: 'Consumption Summary' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'Peak Value' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'Average Value' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'Compared to average consumption' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'Total cost' })}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {formatMessage({ id: 'Total consumption' })}
                </Typography>
            </CardContent>
        </Card>
    );
}
