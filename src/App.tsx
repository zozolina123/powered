import './App.scss';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RoutesArray } from './components/navigation/common/NavigationUtils';
import ResponsiveNavbar from './components/navigation/common/ResponsiveNavbar';
import Daily from './components/pages/consumption/Daily';
import Home from './components/pages/consumption/Home';
import Monthly from './components/pages/consumption/Monthly';
import Weekly from './components/pages/consumption/Weekly';
import Price from './components/pages/price/Price';
import Settings from './components/settings/Settings';
import { DimProvider } from './components/utils/DimContext';
import DataWrapper from './components/wrappers/DataWrapper';
import DateUtilProvider from './components/wrappers/DateUtilProvider';
import IntlProvider from './components/wrappers/IntlWrapper';
import ReduxWrapper from './components/wrappers/ReduxWrapper';
import CustomThemeProvider from './components/wrappers/ThemeWrapper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            paddingTop: theme.spacing(3),
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(2),
            },
        },
    }),
);

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <ReduxWrapper>
            <IntlProvider>
                <DateUtilProvider>
                    <CustomThemeProvider>
                        <DataWrapper>
                            <DimProvider>
                                <Router>
                                    <Helmet titleTemplate="%s | PowerEd" defaultTitle="PowerEd" />
                                    <div className={classes.root}>
                                        <ResponsiveNavbar />
                                        <main className={classes.content}>
                                            <div className={classes.toolbar} />
                                            <Switch>
                                                <Route path={RoutesArray.daily.route}>
                                                    <Daily />
                                                </Route>
                                                <Route path={RoutesArray.monthly.route}>
                                                    <Monthly />
                                                </Route>
                                                <Route path={RoutesArray.weekly.route}>
                                                    <Weekly />
                                                </Route>
                                                <Route path={RoutesArray.settings.route}>
                                                    <Settings />
                                                </Route>
                                                <Route path={RoutesArray.priceComparison.route}>
                                                    <Price />
                                                </Route>
                                                <Route path={RoutesArray.home.route}>
                                                    <Home />
                                                </Route>
                                            </Switch>
                                        </main>
                                    </div>
                                </Router>
                            </DimProvider>
                        </DataWrapper>
                    </CustomThemeProvider>
                </DateUtilProvider>
            </IntlProvider>
        </ReduxWrapper>
    );
};

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

export default App;
