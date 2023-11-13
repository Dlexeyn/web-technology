import IStock from "./Stock";
import IStocks from "./Stock";
export interface ISettings {
    startDate: string;
    dateChangeSpeed: number;
    usedStocks: IStocks[];
    isStarted: boolean;
    currentDate: string;
}

export const initSettings = {
    startDate: "",
    dateChangeSpeed: 1,
    usedStocks: [],
    isStarted: false,
    currentDate: ""
}