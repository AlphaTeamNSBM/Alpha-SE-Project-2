import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/bankaccount';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../shared/services/service';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    testForm: FormGroup;
    bankAccount: BankAccount = new BankAccount();
    submitted: boolean = false;
    error: string = "";
    isReg: boolean = false;
    match = true;
    constructor( private fb: FormBuilder, private router: Router, private service: Service) {

    }

    ngOnInit() {
        this.testForm = this.fb.group({
            name: ['', [Validators.required as any]],
            address: [''],
            contact: [''],
            accountno: ['', [Validators.required as any]],
            username: ['', [Validators.required as any]],
            password: ['', [Validators.required as any]],
            password2: ['', [Validators.required as any]],
        });

        this.getMaxAccountNumber();
    }

    getMaxAccountNumber(): void {
        this.service.getMaxAccountNumber()
            .subscribe((data: number) => {
                this.bankAccount.AccountNumber = data + 1;
            },
            (error: Response) => {
            });
    }

    validPass(): boolean {
        if (this.bankAccount.Password.trim() != this.bankAccount.Password2.trim()) {
            this.match = false;
            return false;
        } else {
            this.match = true;
            return true;
        }
    }

    save(model: BankAccount, isValid: boolean) {
        this.error = "";
        this.submitted = true;
        if (isValid && this.validPass()) {
            this.service.createBankAccount(this.bankAccount)
                .subscribe((data: BankAccount) => {
                    this.isReg = true;
                    localStorage.setItem('loginUserId', data.Id.toString());
                    this.router.navigate(['login']);
                },
                (error: any) => {
                    if (error.status === 400) {
                        this.error = error._body;
                        window.scrollTo(0, 0);
                    } else {
                        window.scrollTo(0, 0);
                        this.error = error.statusText;
                    }
                });
        }
    }

    saveBroker() {
        this.error = "";
        this.submitted = true;
        var bankAccountId = +localStorage.getItem('loginUserId');
        if (bankAccountId != undefined) {
            this.service.createBroker(bankAccountId)
                .subscribe((data: number) => {
                    localStorage.setItem('BrokerId', data.toString());
                    this.router.navigate(['login']);
                },
                (error: any) => {
                    if (error.status === 400) {
                        this.error = error._body;
                        window.scrollTo(0, 0);
                    } else {
                        window.scrollTo(0, 0);
                        this.error = error.statusText;
                    }
                });
        } else {
            this.error = "Bank Account Cannot find";
        }
    }
}
