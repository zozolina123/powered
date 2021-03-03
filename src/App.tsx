import './App.scss';

import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResponsiveNavbar from './components/navigation/common/ResponsiveNavbar';
import Daily from './components/pages/Daily';
import Home from './components/pages/Home';
import Monthly from './components/pages/Monthly';
import Weekly from './components/pages/Weekly';
import Settings from './components/settings/Settings';
import { DimProvider } from './components/utils/DimContext';
import DataWrapper from './components/wrappers/DataWrapper';
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ReduxWrapper>
                <IntlProvider>
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
                                                <Route path="/daily">
                                                    <Daily />
                                                </Route>
                                                <Route path="/monthly">
                                                    <Monthly />
                                                </Route>
                                                <Route path="/weekly">
                                                    <Weekly />
                                                </Route>
                                                <Route path="/settings">
                                                    <Settings />
                                                </Route>
                                                <Route path="/">
                                                    <Home />
                                                </Route>
                                            </Switch>
                                        </main>
                                    </div>
                                </Router>
                            </DimProvider>
                        </DataWrapper>
                    </CustomThemeProvider>
                </IntlProvider>
            </ReduxWrapper>
        </MuiPickersUtilsProvider>
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
