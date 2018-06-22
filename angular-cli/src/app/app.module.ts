import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { NavComponent } from './shared/nav.component';
import { BrokerComponent } from './shared/broker.component';
import { RegisterComponent } from './shared/register.component';
import { LoginComponent } from './shared/login.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomHttp } from './shared/custom.http';
import { HttpModule, Http, XHRBackend, RequestOptions, ConnectionBackend } from '@angular/http';
import { Constants } from './app.constants';
import { Service } from './shared/services/service';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        NavComponent,
        BrokerComponent,
    AppComponent
  ],
  imports: [
      routing,
      ReactiveFormsModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [ Service, Constants,{
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
          return new CustomHttp(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
