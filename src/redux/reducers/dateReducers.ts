import { CHANGE_DATE } from '../actions/dateActions';
import { IDateAction } from '../ApiInterfaces';

const date = (state = new Date(), action: IDateAction): Date => {
    switch (action.type) {
        case CHANGE_DATE:
            return action.date || new Date();
        default:
            return state;
    }
};

export default date;
