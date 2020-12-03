import { Box, Drawer } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import React from 'react';
import { Link } from 'react-router-dom';

import DrawerContent from './Drawer';
import { NavigationProps, RoutesArray } from './NavigationUtils';

export default function DesktopNavbar({
    handleDrawerToggle,
    classes,
    location,
    isMobileView,
}: NavigationProps): React.ReactElement {
    return (
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
            <DrawerContent
                isMobileView={isMobileView}
                handleDrawerToggle={handleDrawerToggle}
                classes={classes}
                location={location}
            />
        </Drawer>
    );
}
