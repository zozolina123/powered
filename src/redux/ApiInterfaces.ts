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

export interface IConsumptionDataState {
    status: APIStatusEnum;
    data: number[];
}
