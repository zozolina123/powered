import './App.scss';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResponsiveNavbar, { drawerWidth } from './components/navigation/ResponsiveNavbar';
import CustomThemeProvider, { ThemeContext } from './components/wrappers/ThemeWrapper';

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
        <CustomThemeProvider>
            <Router>
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
        </CustomThemeProvider>
    );
};

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Settings(props: any) {
    return (
        <div>
            <h2>Settings</h2>
            <ThemeContext.Consumer>
                {({ palleteType, changePalleteType }) => (
                    <button onClick={() => changePalleteType(palleteType === 'dark' ? 'light' : 'dark')}>
                        Change theme
                    </button>
                )}
            </ThemeContext.Consumer>
        </div>
    );
}

export default App;
