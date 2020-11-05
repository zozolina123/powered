import * as React from 'react';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import locales from './locales';

const messages: Record<string, Record<string, string>> = locales;

const initialLocale = 'en';
export const cache = createIntlCache();
export let intl = createIntl({ locale: initialLocale, messages: messages[initialLocale] }, cache);
export let fmt = intl.formatMessage;

const IntlWrapper: React.FC = ({ children }) => {
    const [locale, setLocale] = React.useState(initialLocale);

    const changeLanguage = (newLocale: string): void => {
        intl = createIntl({ locale: newLocale, messages: messages[newLocale] }, cache);
        fmt = intl.formatMessage;
        document.documentElement.lang = newLocale;
        setLocale(newLocale);
    };

    return (
        <RawIntlProvider value={intl}>
            <div className="language-selector">
                <select
                    name="locale"
                    defaultValue={locale}
                    id="locale"
                    onChange={(event): void => changeLanguage(event.target.value)}
                >
                    {Object.keys(messages).map((locale) => (
                        <option key={locale} value={locale}>
                            {locale}
                        </option>
                    ))}
                </select>
            </div>
            {children}
        </RawIntlProvider>
    );
};

export default IntlWrapper;
