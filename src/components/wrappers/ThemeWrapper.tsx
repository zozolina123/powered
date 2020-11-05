import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

interface IContextProps {
    palleteType: 'light' | 'dark';
    changePalleteType: (type: string) => void;
}

export const ThemeContext = React.createContext({} as IContextProps);

export default function CustomThemeProvider(props: Props) {
    const [palleteType, changePalleteType]: ['dark' | 'light', Dispatch<SetStateAction<any>>] = useState('light');

    const theme = createMuiTheme({
        palette: {
            type: palleteType,
            primary: {
                main: orange[500],
            },
            secondary: {
                main: blue[500],
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ palleteType: palleteType, changePalleteType: changePalleteType }}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
