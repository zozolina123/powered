import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EcoIcon from '@material-ui/icons/Eco';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import TodayIcon from '@material-ui/icons/Today';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import React from 'react';
import { RouteProps } from 'react-router-dom';

export interface RouteMap {
    [key: string]: {
        icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
        route: string;
    };
}

export interface NavigationProps {
    handleDrawerToggle: () => void;
    desktopOpen?: boolean;
    isMobileView: boolean;
    container: (() => HTMLElement) | undefined;
    classes: {
        link: string;
        drawerPaper: string;
        drawerHeader: string;
        drawer: string;
        drawerOpen: string;
        drawerClose: string;
    };

    location: RouteProps['location'];
}

export interface MobileNavigationProps extends NavigationProps {
    setMobileOpen: (arg0: boolean) => void;
    theme: {
        direction: 'rtl' | 'ltr';
    };
    mobileOpen: boolean;
}

export const RoutesArray: RouteMap = {
    home: {
        icon: HomeIcon,
        route: '/',
    },
    daily: {
        icon: TodayIcon,
        route: '/daily',
    },
    weekly: {
        icon: ViewWeekIcon,
        route: '/weekly',
    },
    monthly: {
        icon: CalendarTodayIcon,
        route: '/monthly',
    },
    carbonFootprint: {
        icon: EcoIcon,
        route: '/footprint',
    },
    priceComparison: {
        icon: AttachMoneyIcon,
        route: '/price',
    },
    settings: {
        icon: SettingsIcon,
        route: '/settings',
    },
};

export function Icon(props: { iconType: string }) {
    const iconName = props.iconType;
    const SpecificIcon = RoutesArray[iconName].icon;
    return <SpecificIcon />;
}
