import { useMediaQuery, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

import DesktopNavbar from '../desktop/DesktopNavbar';
import { useDesktopStyles } from '../desktop/DesktopNavBarStyling';
import MobileNavbar from '../mobile/MobileNavbar';
import { useMobileStyles } from '../mobile/MobileNavBarStyling';
import { RoutesArray } from './NavigationUtils';

export const drawerWidth = 240;

export default function ResponsiveNavbar(props: { window?: () => Window }): React.ReactElement {
    const { window } = props;
    const location = useLocation();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const classesDeskop = useDesktopStyles();
    const classesMobile = useMobileStyles();
    const classes = isMobileView ? classesMobile : classesDeskop;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [desktopOpen, setDesktopOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setDesktopOpen(true);
    };

    const handleDrawerClose = () => {
        setDesktopOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const titleId = Object.keys(RoutesArray).find((key) => RoutesArray[key].route === location.pathname);

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: desktopOpen,
                })}
            >
                <Toolbar>
                    {isMobileView ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={clsx(classes.menuButton, {
                                [classes.hide]: desktopOpen,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="inherit" onClick={desktopOpen ? handleDrawerClose : handleDrawerOpen}>
                            {desktopOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap>
                        <FormattedMessage id={titleId} />
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav aria-label="navigation">
                <Hidden smUp implementation="css">
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
                        desktopOpen={desktopOpen}
                        container={container}
                        location={location}
                        classes={classes}
                        handleDrawerToggle={handleDrawerToggle}
                        isMobileView={isMobileView}
                    />
                </Hidden>
            </nav>
        </>
    );
}
