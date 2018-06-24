import { Component, OnInit } from '@angular/core';
import { Stock, StockTransaction } from '../models/stock';
import { Sector } from '../models/sector';
import { Turn } from '../models/turn';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../shared/services/service';
import { Broker, StartResponce } from '../models/broker';
import { CurrentBankInfo } from '../models/bankaccount';
@Component({
    selector: 'broker',
    templateUrl: './broker.component.html'
})
export class BrokerComponent implements OnInit {
    buyingItemList: Stock[] = new Array<Stock>();
    sectorList: Sector[] = new Array<Sector>();
    selectedBuySectorId = 0;
    selectedBuyStockId = 0;
    selectedChartSector: Sector = new Sector();
    isSelectItemToSell: boolean = false;
    isSelectItemToBuy: boolean = false;
    selectedStockToBuy: Stock = new Stock();
    sellForm: FormGroup;
    sellingStockId: number = 0;
    sellingStockError: string;
    sellingQty: number = 0;
    sellingBotQty: number = 0;
    sellingQtyError: string;
    sellingPrice: number = 0;
    sellingItemBotPrice: number = 0;
    stockTransactionList = new Array<StockTransaction>();
    sellingPriceError: string;
    buyingQty: number = 0;
    buyingError: string;
    isStartGame = false;
    turnId: number = 0;
    turn: number = 0;
    roundId: number = 0;
    currentBankInfo: CurrentBankInfo = new CurrentBankInfo();
    bankAccountId: number = 0;
    buyForm: FormGroup;
    buyItemPrice: number = 0;
    transactionHistoryList= new Array<StockTransaction>();
    constructor(private fb: FormBuilder, private service: Service) {

    }

    ngOnInit() {
        
        this.sellForm = this.fb.group({
            stock: ['', [Validators.required as any]],
            qty: ['', [Validators.required as any]],
            price: ['', [Validators.required as any]],
        });

        this.buyForm = this.fb.group({
            stock: ['', [Validators.required as any]],
            qty: ['', [Validators.required as any]],
            sector: ['', [Validators.required as any]],
        });

     
        var isStart = localStorage.getItem('isStart');
        var turn = localStorage.getItem('TurnId');
        if (turn)
            this.turnId = +turn;

        var turn = localStorage.getItem('Turn');
        if (turn)
            this.turn = +turn;

        var isLogin = localStorage.getItem('isLogin');
        var loginUserId = localStorage.getItem('loginUserId');
        this.getCurrentUserInfo(+loginUserId);
        this.bankAccountId = +loginUserId;
        this.getSellingItem();
        this.getSectors();
        this.getHistory();
    }

   
    getSellingItem(): void {
        this.service.getSellingItem(this.bankAccountId)
            .subscribe((data: StockTransaction[]) => {
                this.stockTransactionList = data;
              
            },
            (error: Response) => {
            });
    }

    getSelectedSectorForSell(id: number): void {
        this.stockTransactionList.forEach((res) => {
            if (res.Id == id) {
                this.sellingStockId = res.Id;
                this.sellingItemBotPrice = res.Price;
                this.sellingBotQty = res.Quantity;
            }

        });
    }

    getSectors(): void {
        this.service.getAll()
            .subscribe((data: Sector[]) => {
                this.sectorList = data;
                this.selectedChartSector.Id = 1;
            },
            (error: Response) => {
            });
    }

    getSelectedStockPrice(selectedBuySectorId: number): void {
        this.buyingItemList.forEach((res) => {
            if (res.Id == selectedBuySectorId) {
                this.buyItemPrice = res.CurrentPrice;
                this.selectedBuyStockId = res.CurrentPrice;
            }
       
        });
    }

    getStockBySectorId(selectedBuySectorId: number): void {
        this.service.getBtSectorId(selectedBuySectorId)
            .subscribe((data: Stock[]) => {
                this.buyingItemList = data;
              
            },
            (error: Response) => {
            });
    }

    getCurrentUserInfo(userId: number): void {
        this.service.getCurrentUserInfo(userId)
            .subscribe((data: CurrentBankInfo) => {
                this.currentBankInfo = data;
            },
            (error: Response) => {
            });
    }

    getHistory(): void {
        this.service.getHistory(this.bankAccountId)
            .subscribe((data: StockTransaction[]) => {
                this.transactionHistoryList = data;
                this.getSellingItem();
                this.isSelectItemToSell = false;
             
            },
            (error: Response) => {
            });

    }

    validBefore(): boolean {
        if (this.sellingItemBotPrice < this.sellingPrice) {
            this.sellingPriceError = "Price is grater than current Price";
            return false;
        }

        if (this.sellingBotQty < this.sellingQty) {
            this.sellingQtyError = "Quantity is grater than your available quantity";
            return false;
        }
        return true;
    }

    sell(): void {
        if (this.validBefore()) {
            this.service.sell(this.sellingStockId, this.sellingQty, this.sellingPrice, this.turnId, this.bankAccountId)
                .subscribe((data: any) => {
                    this.getCurrentUserInfo(this.bankAccountId);
                    this.getSellingItem();
                    this.isSelectItemToSell = false;
                    this.sellingQty = 0;
                    this.sellingPrice = 0;
                    this.getCurrentTurn();
                    this.getSellingItem();
                },
                (error: Response) => {
                });
        }
    }

    validateBeforeBuy(): boolean {
        this.buyingError = "";
        if (this.currentBankInfo.CurrentBaniBalance < this.buyItemPrice * this.buyingQty) {
            this.buyingError = "Your bank balance is not enought.";
            return false;
        }

        if (this.selectedBuyStockId == 0) {
            this.buyingError = "Stock not found.";
        }
        return true;
    }

    buy(): void {
        if (this.validateBeforeBuy()) {
            this.service.buy(this.selectedBuyStockId, this.buyingQty, this.turnId, this.bankAccountId)
                .subscribe((data: any) => {
                    this.getSellingItem();
                    this.buyItemPrice = 0;
                    this.isSelectItemToBuy = false;
                    this.selectedStockToBuy = new Stock();
                    this.buyingQty = 0;
                    this.getCurrentTurn();
                    this.getSellingItem();
                },
                (error: Response) => {
                });
        }
    }

    getCurrentTurn(): void {
            this.service.getCurrentTurn()
                .subscribe((data: Turn) => {
                    this.turn = data.Turn;
                    this.turnId = data.Id;
                },
                (error: Response) => {
                });
    }

    onChangeBuyingRowChecked(items: Stock) {
        this.buyingItemList.forEach(function (v, k) {
            if (items.Id != v.Id || v.IsCheck === undefined || v.IsCheck === null)
                v.IsCheck = false;
        });

        if (items.IsCheck) {
            this.isSelectItemToBuy = true;
            this.selectedStockToBuy = items;
        }
        else {
            this.isSelectItemToBuy = false;
            this.selectedStockToBuy = new Stock();
        }
    }

}
