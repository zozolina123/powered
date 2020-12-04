import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from '../common/ResponsiveNavbar';

export const useMobileStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {},
        drawerOpen: {},
        drawerClose: {},
        appBarShift: {},
        hide: {},
        appBar: {
            color: theme.palette.common.white,
        },
        menuButton: {
            marginRight: theme.spacing(2),
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
