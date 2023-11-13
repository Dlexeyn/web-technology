export interface IBroker{
    id: number,
    name: string,
    cash: number
}

export interface IBrokers{
    brokers: IBroker[]
}

export interface IBrokerUpdate{
    name: string,
    cash: number
}

export interface IBrokerCreate{
    name: string,
    cash: number
}