import { FormControlLabel, Switch } from '@material-ui/core';
import React from 'react';

import { ThemeContext } from '../wrappers/ThemeWrapper';

export default function ThemeSelector() {
    return (
        <ThemeContext.Consumer>
            {({ palleteType, changePalleteType }) => (
                <FormControlLabel
                    labelPlacement="start"
                    label="Dark Mode"
                    control={
                        <Switch
                            checked={palleteType === 'dark' ? true : false}
                            onChange={() => changePalleteType(palleteType === 'dark' ? 'light' : 'dark')}
                            name="Dark Mode"
                            color="primary"
                        />
                    }
                />
            )}
        </ThemeContext.Consumer>
    );
}
