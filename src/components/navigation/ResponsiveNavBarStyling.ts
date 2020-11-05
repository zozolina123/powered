import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from './ResponsiveNavbar';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            color: theme.palette.common.white,
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.main,
            marginTop: theme.spacing(1),
            padding: theme.spacing(1),
            justifyContent: 'center',
        },
        link: {
            textDecoration: 'none',
            color: 'inherit',
        },
    }),
);
