import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

import DocumentTitle from '../utils/DocumentTitle';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        language: {
            margin: theme.spacing(1),
        },
    }),
);

export default function Settings(): React.ReactElement {
    const classes = useStyles();
    return (
        <div>
            <DocumentTitle title="Page.settings" />
            <div>
                <ThemeSelector />
            </div>
            <div className={classes.language}>
                <LanguageSelector />
            </div>
        </div>
    );
}
