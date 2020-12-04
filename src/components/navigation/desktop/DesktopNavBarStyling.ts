import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from '../common/ResponsiveNavbar';

export const useDesktopStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.common.white,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(10) + 1,
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        drawerPaper: {},
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
