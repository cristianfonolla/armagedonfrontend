import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GraphsComponent } from './graphs/graphs.component';
import { InfoMockService } from "./info-mock.service";
import { ChartsModule } from 'ng2-charts';
import { TestWebSocketService } from "./test-web-socket.service";
import { TestSocketComponent } from './test-socket/test-socket.component';
import { GraphsWithSocketComponent } from './graphs-with-socket/graphs-with-socket.component';
import { GraphKeyTestComponent } from './graph-key-test/graph-key-test.component';
import { ButtonModule, DialogModule } from "primeng/primeng";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule, HttpHandler, HttpHeaders} from "@angular/common/http";
import { FotoComponent } from './foto/foto.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth-service.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent,
    TestSocketComponent,
    GraphsWithSocketComponent,
    GraphKeyTestComponent,
    FotoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule
  ],
  providers: [InfoMockService, TestWebSocketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
