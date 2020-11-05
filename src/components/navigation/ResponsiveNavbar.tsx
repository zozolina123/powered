import { Box, SvgIconTypeMap, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EcoIcon from '@material-ui/icons/Eco';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import TodayIcon from '@material-ui/icons/Today';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useStyles } from './ResponsiveNavBarStyling';

export const drawerWidth = 240;

export default function ResponsiveNavbar(props: { window?: () => Window }) {
    const { window } = props;
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();

    interface RouteMap {
        [key: string]: {
            icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
            route: string;
        };
    }

    const RoutesArray: RouteMap = {
        Home: {
            icon: HomeIcon,
            route: '/',
        },
        Daily: {
            icon: TodayIcon,
            route: '/daily',
        },
        Weekly: {
            icon: ViewWeekIcon,
            route: '/weekly',
        },
        Monthly: {
            icon: CalendarTodayIcon,
            route: '/monthly',
        },
        'Carbon footprint': {
            icon: EcoIcon,
            route: '/footprint',
        },
        'Price Comparison': {
            icon: AttachMoneyIcon,
            route: '/price',
        },
        Settings: {
            icon: SettingsIcon,
            route: '/settings',
        },
    };

    function Icon(props: { iconType: string }) {
        const iconName = props.iconType;
        const SpecificIcon = RoutesArray[iconName].icon;
        return <SpecificIcon />;
    }

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                {['Home', 'Daily', 'Weekly', 'Monthly'].map((text, index) => (
                    <Link
                        onClick={() => setMobileOpen(false)}
                        to={RoutesArray[text].route}
                        className={classes.link}
                        key={index}
                    >
                        <ListItem
                            button
                            key={text}
                            selected={location.pathname === RoutesArray[text].route ? true : false}
                        >
                            <IconButton color={location.pathname === RoutesArray[text].route ? 'primary' : 'inherit'}>
                                {<Icon iconType={text} />}
                            </IconButton>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['Carbon footprint', 'Price Comparison', 'Settings'].map((text, index) => (
                    <Link
                        onClick={() => setMobileOpen(false)}
                        to={RoutesArray[text].route}
                        className={classes.link}
                        key={index}
                    >
                        <ListItem
                            button
                            key={text}
                            selected={location.pathname === RoutesArray[text].route ? true : false}
                        >
                            <IconButton color={location.pathname === RoutesArray[text].route ? 'primary' : 'inherit'}>
                                {<Icon iconType={text} />}
                            </IconButton>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <Box component="span" fontSize="h4.fontSize" fontWeight="fontWeightBold">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link
                                        onClick={() => setMobileOpen(false)}
                                        to={RoutesArray.Home.route}
                                        className={classes.link}
                                    >
                                        <FlashOnIcon style={{ fontSize: '2.125rem' }} />
                                        PowerEd
                                    </Link>
                                </div>
                            </Box>
                        </div>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.drawerHeader}>
                            <Box component="span" fontSize="h4.fontSize" fontWeight="fontWeightBold" className={'logo'}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link to={RoutesArray.Home.route} className={classes.link}>
                                        <FlashOnIcon fontSize="inherit" />
                                        PowerEd
                                    </Link>
                                </div>
                            </Box>
                        </div>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}
