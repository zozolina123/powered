import { Box, Drawer } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import DrawerContent from '../common/Drawer';
import { NavigationProps, RoutesArray } from '../common/NavigationUtils';

export default function DesktopNavbar({
    handleDrawerToggle,
    classes,
    location,
    isMobileView,
    desktopOpen,
}: NavigationProps): React.ReactElement {
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: desktopOpen,
                [classes.drawerClose]: !desktopOpen,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: desktopOpen,
                    [classes.drawerClose]: !desktopOpen,
                }),
            }}
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
            <DrawerContent
                isMobileView={isMobileView}
                handleDrawerToggle={handleDrawerToggle}
                classes={classes}
                location={location}
            />
        </Drawer>
    );
}
