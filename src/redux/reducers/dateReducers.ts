import { CHANGE_DATE, CHANGE_MONTH } from '../actions/dateActions';
import { IDateAction, IDateState, isOfTypeMonth } from '../ApiInterfaces';

const todayDate = new Date();
const monthName = todayDate.toLocaleString('default', { month: 'long' });

const initialState: IDateState = {
    day: todayDate,
    month: isOfTypeMonth(monthName) ? monthName : 'January',
    week: null,
};

const date = (state = initialState, action: IDateAction): IDateState => {
    switch (action.type) {
        case CHANGE_DATE:
            return { ...state, day: action.date || todayDate };
        case CHANGE_MONTH:
            return {
                ...state,
                month: isOfTypeMonth(action.month) ? action.month : 'January',
            };
        default:
            return state;
    }
};

export default date;
