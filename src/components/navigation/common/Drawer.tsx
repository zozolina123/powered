import { Divider, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, RouteProps } from 'react-router-dom';

import { Icon } from './NavigationUtils';
import { RoutesArray } from './NavigationUtils';

interface Props {
    isMobileView: boolean;
    handleDrawerToggle: () => void;
    classes: {
        link: string;
    };
    location: RouteProps['location'];
}

export default function Drawer({ isMobileView, handleDrawerToggle, classes, location }: Props): React.ReactElement {
    return (
        <div>
            <List>
                {['home', 'daily', 'weekly', 'monthly'].map((text, index) => (
                    <Link
                        onClick={() => isMobileView && handleDrawerToggle()}
                        to={RoutesArray[text].route}
                        className={classes.link}
                        key={index}
                    >
                        <ListItem
                            button
                            key={text}
                            selected={location?.pathname === RoutesArray[text].route ? true : false}
                        >
                            <IconButton color={location?.pathname === RoutesArray[text].route ? 'primary' : 'inherit'}>
                                {<Icon iconType={text} />}
                            </IconButton>
                            <ListItemText style={{ paddingLeft: '20px' }}>
                                <FormattedMessage id={'Page.' + text.toLowerCase()} />
                            </ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['carbonFootprint', 'priceComparison', 'settings'].map((text, index) => (
                    <Link
                        onClick={() => isMobileView && handleDrawerToggle()}
                        to={RoutesArray[text].route}
                        className={classes.link}
                        key={index}
                    >
                        <ListItem
                            button
                            key={text}
                            selected={location?.pathname === RoutesArray[text].route ? true : false}
                        >
                            <IconButton color={location?.pathname === RoutesArray[text].route ? 'primary' : 'inherit'}>
                                {<Icon iconType={text} />}
                            </IconButton>
                            <ListItemText style={{ paddingLeft: '20px' }}>
                                <FormattedMessage id={'Page.' + text} />
                            </ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
}
