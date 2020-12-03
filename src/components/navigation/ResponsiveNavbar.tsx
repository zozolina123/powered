import { useMediaQuery, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { RoutesArray } from './NavigationUtils';
import { useStyles } from './ResponsiveNavBarStyling';

export const drawerWidth = 240;

export default function ResponsiveNavbar(props: { window?: () => Window }): React.ReactElement {
    const { window } = props;
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const titleId = Object.keys(RoutesArray).find((key) => RoutesArray[key].route === location.pathname);

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
                        <FormattedMessage id={titleId} />
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <MobileNavbar
                        theme={theme}
                        container={container}
                        location={location}
                        classes={classes}
                        mobileOpen={mobileOpen}
                        isMobileView={isMobileView}
                        handleDrawerToggle={handleDrawerToggle}
                        setMobileOpen={setMobileOpen}
                    />
                </Hidden>
                <Hidden smDown implementation="css">
                    <DesktopNavbar
                        container={container}
                        location={location}
                        classes={classes}
                        handleDrawerToggle={handleDrawerToggle}
                        isMobileView={isMobileView}
                    />
                </Hidden>
            </nav>
        </div>
    );
}
