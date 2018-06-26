import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Stock, StockTransaction, AnalystModel } from '../../models/stock';
import { Constants } from '../../app.constants';
import { Sector } from '../../models/sector';
import { Turn } from '../../models/turn';
import { BankAccount, CurrentBankInfo, LoginResponce } from '../../models/bankaccount';

@Injectable()
export class Service {
    loggedIn = false;

    private baseUrl: string;
    constructor(private http: Http, private router: Router, private constants: Constants) {
         this.loggedIn = !!localStorage.getItem('isLogin');
        this.baseUrl = constants.url;
    }

    getBtSectorId(sectorId:number): Observable<Stock[]> {
        return this.http.get(this.baseUrl + "api/Stock" + "/GetBySectorId?sectorId=" + sectorId)
            .map(res => (res.json() as Stock[]));
    }

    getDataForPredicate(): Observable<AnalystModel[]> {
        return this.http.get(this.baseUrl + "api/Stock" + "/getPredicator")
            .map(res => (res.json() as AnalystModel[]));
    }

    getAll(): Observable<Sector[]> {
        return this.http.get(this.baseUrl + "api/Sector")
            .map(res => (res.json() as Sector[]));
    }

    createBroker(bankAccountId: number): Observable<number> {
        return this.http.get(this.baseUrl + "api/broker" + "/create?bankAccountId=" + bankAccountId)
            .map(res => (res.json() as number));
    }

    createBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
        return this.http.get(this.baseUrl + "api/bankAccount" + "/create?playerName=" + bankAccount.PlayerName + "&userName=" + bankAccount.UserName + "&password=" + bankAccount.Password + "&accountNumber=" + bankAccount.AccountNumber)
            .map(res => (res.json() as BankAccount));
    }

    login(userName: string, passW: string): Observable<LoginResponce> {
        return this.http.get(this.baseUrl + "api/bankAccount" + "/login?username=" + userName + "&password=" + passW)
            .map(res => (res.json() as LoginResponce));
    }

    getMaxAccountNumber(): Observable<number> {
        return this.http.get(this.baseUrl + "api/bankAccount" + "/maxAccountNumber")
            .map(res => (res.json() as number));
    }

    getSellingItem(bankAccountId: number): Observable<StockTransaction[]> {
        return this.http.get(this.baseUrl + "api/Stock" + "/GetSoldItem?bankId=" + bankAccountId)
            .map(res => (res.json() as StockTransaction[]));
    }

    getHistory(bankAccountId: number): Observable<StockTransaction[]> {
        return this.http.get(this.baseUrl + "api/Stock" + "/History?bankAccoundId=" + bankAccountId)
            .map(res => (res.json() as StockTransaction[]));
    }

    getCurrentUserInfo(userId: number): Observable<CurrentBankInfo> {
        return this.http.get(this.baseUrl + "api/bankAccount" + "/currentBankInfo?bankAccountId=" + userId)
            .map(res => (res.json() as CurrentBankInfo));
    }

    getCurrentTurn() {
        return this.http.get(this.baseUrl + "api/Stock" + "/getCurrentTurn").map(res => (res.json() as Turn));
    }

    sell(stockTransactionId: number, qty: number, sellingPrice: number, turnId: number, bankAccoundId: number) {
        return this.http.get(this.baseUrl + "api/Stock" + "/sell?stockTransactionId=" + stockTransactionId + "&qty=" + qty + "&sellingPrice=" + sellingPrice + "&turnId=" + turnId + "&bankAccoundId=" + bankAccoundId);
    }

    buy(stockId: number, qty: number, turnId: number, bankAccoundId: number) {
        return this.http.get(this.baseUrl + "api/Stock" + "/buy?stockId=" + stockId + "&qty=" + qty + "&turnId=" + turnId + "&bankAccoundId=" + bankAccoundId);
    }

}
