export type MonthTypes =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export function isOfTypeMonth(str: any): str is MonthTypes {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ].includes(str);
}

export interface IConsumptionDataAPI {
    January: any;
    February: any;
    March: any;
    April: any;
    May: any;
    June: any;
    July: any;
    August: any;
    September: any;
    October: any;
    November: any;
    December: any;
}

export interface IDateAction {
    type: string;
    date?: Date;
    month?: MonthTypes;
    week?: Date;
}

export enum APIStatusEnum {
    SUCCESS = 'SUCCESS',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    IDLE = 'IDLE',
}

export interface IConsumptionDataAction {
    type: string;
    status?: APIStatusEnum;
    data: number[];
    date?: Date;
}

export interface IPriceDataAction {
    type: string;
    status?: APIStatusEnum;
    data: IPrice[];
}

export interface IConsumptionDataState {
    status: APIStatusEnum;
    dailyData: number[];
    monthlyData: number[];
    weeklyData: number[];
    overviewData?: any;
}

export interface IPriceDataState {
    status: APIStatusEnum;
    data: IPrice[];
}

export interface IDateState {
    day: Date;
    month: MonthTypes;
    week: Date;
}

export interface IPrice {
    id: number;
    furnizor: string;
    energieRegenerabila: number;
    valCompFix: number;
    tarifTransport: number;
    tarifSistem: number;
    tarifDistributie: number;
    pretCertificateVerzi: number;
    taxaCogenerare: number;
    pretEnergie: number;
    tarifFinal: number;
    acciza: number;
    tva: number;
}
