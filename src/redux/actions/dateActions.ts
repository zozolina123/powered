export const CHANGE_DATE = 'CHANGE_DATE';

export const changeDate = (date: Date | undefined) => {
    return {
        type: CHANGE_DATE,
        date: date,
    };
};

export default { changeDate };
