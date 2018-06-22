import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerComponent } from '../app/shared/broker.component';
import { LoginComponent } from '../app/shared/login.component';
import { RegisterComponent } from '../app/shared/register.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'broker', pathMatch: 'full', component: BrokerComponent },
    { path: 'login/register', pathMatch: 'full', component: RegisterComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
