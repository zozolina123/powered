import * as React from 'react';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import locales, { localeEnum } from '../i18n/locales';

const messages: Record<string, Record<string, string>> = locales;

const initialLocale = localeEnum.EN;
export const cache = createIntlCache();
export let intl = createIntl({ locale: initialLocale, messages: messages[initialLocale] }, cache);
export let fmt = intl.formatMessage;

interface Props {
    children: React.ReactNode;
}

interface IContextProps {
    locale: localeEnum;
    changeLanguage: (locale: localeEnum) => void;
}

export const LocaleContext = React.createContext({} as IContextProps);

const IntlWrapper: React.FC<Props> = ({ children }: Props) => {
    const [locale, setLocale] = React.useState(initialLocale);

    const changeLanguage = (newLocale: localeEnum): void => {
        intl = createIntl({ locale: newLocale, messages: messages[newLocale] }, cache);
        fmt = intl.formatMessage;
        document.documentElement.lang = newLocale;
        setLocale(newLocale);
    };

    return (
        <LocaleContext.Provider value={{ locale, changeLanguage }}>
            <RawIntlProvider value={intl}>{children}</RawIntlProvider>
        </LocaleContext.Provider>
    );
};

export default IntlWrapper;
