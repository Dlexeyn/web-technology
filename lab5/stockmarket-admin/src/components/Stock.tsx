export default interface IStocks{
    id: number;
    label: string;
    name: string;
    price: number;
}

export default interface IAnswer{
    newTime: string,
    updatedStocks: IStocks[]
}