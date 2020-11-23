import './App.scss';

import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import ResponsiveNavbar, { drawerWidth } from './components/navigation/ResponsiveNavbar';
import Settings from './components/settings/Settings';
import { DimProvider } from './components/utils/DimContext';
import IntlProvider from './components/wrappers/IntlWrapper';
import CustomThemeProvider from './components/wrappers/ThemeWrapper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                marginLeft: `${drawerWidth}px`,
            },
        },
    }),
);

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <IntlProvider>
                <CustomThemeProvider>
                    <DimProvider>
                        <Router>
                            <Helmet titleTemplate="%s | PowerEd" defaultTitle="PowerEd" />
                            <ResponsiveNavbar />
                            <main className={classes.content}>
                                <div className={classes.toolbar} />
                                <Switch>
                                    <Route path="/about">
                                        <About />
                                    </Route>
                                    <Route path="/settings">
                                        <Settings />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </main>
                        </Router>
                    </DimProvider>
                </CustomThemeProvider>
            </IntlProvider>
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
