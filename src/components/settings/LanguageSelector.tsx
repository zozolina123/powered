import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

import locales, { localeEnum } from '../i18n/locales';
import { LocaleContext } from '../wrappers/IntlWrapper';

function LanguageSelector(props: WrappedComponentProps) {
    const { intl } = props;
    return (
        <LocaleContext.Consumer>
            {({ locale, changeLanguage }) => {
                const languageOptions = Object.keys(locales).map((locale) => (
                    <FormControlLabel
                        key={locale}
                        value={locale}
                        control={<Radio color="primary" />}
                        label={intl.formatMessage({ id: 'Language.' + locale })}
                    />
                ));
                return (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <FormattedMessage id="Page.language" />
                        </FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={locale}
                            onChange={(event): void => {
                                const localeName = event.target.value.toUpperCase();
                                const locale: localeEnum = localeEnum[localeName as keyof typeof localeEnum];
                                changeLanguage(locale);
                            }}
                        >
                            {languageOptions}
                        </RadioGroup>
                    </FormControl>
                );
            }}
        </LocaleContext.Consumer>
    );
}

export default injectIntl(LanguageSelector);
