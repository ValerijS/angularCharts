import {
    NgModule
} from '@angular/core';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpClientModule
} from '@angular/common/http';
import {
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
    HttpModule
} from '@angular/http';
import {
    ChartsModule
} from 'ng2-charts';
import {
    MatTableModule
} from '@angular/material';
import {
    MatInputModule
} from '@angular/material';

import {
    AppComponent
} from './app.component';    
import {
    InputDataService
} from './input-data.service';

@NgModule({
    imports: [ChartsModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, HttpModule, MatTableModule, MatInputModule],
    declarations: [AppComponent],
    providers: [InputDataService],
    bootstrap: [AppComponent]
})
export class AppModule {}
