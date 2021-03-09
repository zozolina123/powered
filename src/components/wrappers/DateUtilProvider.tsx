import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { enUS, ro } from 'date-fns/locale';
import React from 'react';
import { useIntl } from 'react-intl';
interface Props {
    children: JSX.Element;
}
const localeMap = {
    en: enUS,
    ro: ro,
};
function DateUtilProvider({ children }: Props) {
    const intl = useIntl();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[intl.locale]}>
            {children}
        </MuiPickersUtilsProvider>
    );
}

export default DateUtilProvider;
