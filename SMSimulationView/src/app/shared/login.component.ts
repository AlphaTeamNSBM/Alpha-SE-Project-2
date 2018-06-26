import { Component, OnInit } from '@angular/core';

import { Login } from '../models/login';
import { BankAccount, LoginResponce } from '../models/bankaccount';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../shared/services/service';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    logForm: FormGroup;
    login: Login = new Login();
    submitted: boolean = false;
    error: string = "";
    constructor(private router: Router, private fb: FormBuilder, private service: Service) {

    }

    ngOnInit() {
        this.logForm = this.fb.group({
            username: ['', [Validators.required as any]],
            password: ['', [Validators.required as any]],
        });
    }

    loginUser(isValid: boolean) {
        this.error = "";
        this.submitted = true;
        if (isValid) {
            this.service.login(this.login.UserName, this.login.Password)
                .subscribe((data: LoginResponce) => {
                    localStorage.setItem('isLogin', "1");
                    this.service.loggedIn = true;
                    localStorage.setItem('BrokerId', data.BrokerId.toString());
                    localStorage.setItem('loginUserId', data.BankAccountId.toString());
                    localStorage.setItem('Turn', data.Turn.toString());
                    localStorage.setItem('TurnId', data.TurnId.toString());
                    this.router.navigate(['broker']);
                },
                (error: any) => {
                    if (error.status === 400) {
                      this.error = "User name or password incorrect. please try again";
                    } else {
                       
                    }
                });
        }
    }
}
