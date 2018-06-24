export class Stock {
    Id: number;
    Name: string;
    CurrentPrice: number;
    CurrentValue: number; 
    SectorId: number;
    IsCheck: boolean;
}

export class AnalystModel {
    Id: number;
    Name: string;
    CurrentPrice: number;
    valus: number[];
    PredictPrice: number;
}

export class StockTransaction {
    Id: number;
    Price: number;
    Type: number;
    TurnId: number;
    BankAccountId: number;
    StockId: number;
    Quantity: number;
    IsCheck: boolean;
    TurnNo: number;
    BankAccountName: string;
    StockName: string;
    SectorName: string;
    CurrentPrice: number;
}
