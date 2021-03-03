import { Box, Drawer } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import React from 'react';
import { Link } from 'react-router-dom';

import DrawerContent from '../common/Drawer';
import { MobileNavigationProps, RoutesArray } from '../common/NavigationUtils';

export default function MobileNavbar({
    mobileOpen,
    setMobileOpen,
    handleDrawerToggle,
    container,
    theme,
    classes,
    location,
    isMobileView,
}: MobileNavigationProps): React.ReactElement {
    return (
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
                        <Link onClick={() => setMobileOpen(false)} to={RoutesArray.home.route} className={classes.link}>
                            <FlashOnIcon style={{ fontSize: '2.125rem' }} />
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
