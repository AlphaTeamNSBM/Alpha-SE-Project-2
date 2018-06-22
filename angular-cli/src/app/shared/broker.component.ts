import { Component, OnInit } from '@angular/core';
import { Stock, StockTransaction } from '../models/stock';
import { Sector } from '../models/sector';
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
    sellingQtyError: string;
    sellingPrice: number = 0;
    sellingPriceError: string;
    buyingQty: number = 0;
    buyingError: string;
    isStartGame = false;
    turnId: number = 0;
    roundId: number = 0;
    currentBankInfo: CurrentBankInfo = new CurrentBankInfo();
    bankAccountId: number = 0;
    buyForm: FormGroup;
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

        this.getSellingItem();
        this.getSectors();
        var isStart = localStorage.getItem('isStart');
        var turn = localStorage.getItem('TurnId');
        if (turn)
            this.turnId = +turn;

        var round = localStorage.getItem('roundId');
        

        var isLogin = localStorage.getItem('isLogin');
        var loginUserId = localStorage.getItem('loginUserId');
        this.getCurrentUserInfo(+loginUserId);
        this.bankAccountId = +loginUserId;

    }

   
    getSellingItem(): void {
        this.service.getSellingItem(1, 1)
            .subscribe((data: StockTransaction[]) => {

            },
            (error: Response) => {
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


    validBefore(): boolean {
        //if (this.selectedSellStockTransaction.CurrentPrice < this.sellingPrice) {
        //    this.sellingPriceError = "Price is grater than current Price";
        //    return false;
        //}
        //if (this.selectedSellStockTransaction.Quantity < this.sellingQty) {
        //    this.sellingQtyError = "Quantity is grater than your available quantity";
        //    return false;
        //}
        return true;
    }

    sell(): void {
        if (this.validBefore()) {
            this.service.sell(0, this.sellingQty, this.sellingPrice, this.turnId, this.bankAccountId)
                .subscribe((data: any) => {
                    this.getCurrentUserInfo(this.bankAccountId);
                    this.getSellingItem();
                    this.isSelectItemToSell = false;
                    this.sellingQty = 0;
                    this.sellingPrice = 0;
                },
                (error: Response) => {
                });
        }
    }

    validateBeforeBuy(): boolean {
        this.buyingError = "";
        if (this.currentBankInfo.CurrentBaniBalance < this.selectedStockToBuy.CurrentPrice * this.buyingQty) {
            this.buyingError = "Your bank balance is not enought.";
            return false;
        }
        return true;
    }

    buy(): void {
        if (this.validateBeforeBuy()) {
            this.service.buy(this.selectedStockToBuy.Id, this.buyingQty, this.turnId, this.bankAccountId)
                .subscribe((data: any) => {
                    this.getSellingItem();
                    this.isSelectItemToBuy = false;
                    this.selectedStockToBuy = new Stock();
                    this.buyingQty = 0;
                },
                (error: Response) => {
                });
        }
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
