//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2025  Interneuron Limited

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

//See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program.If not, see<http://www.gnu.org/licenses/>.
//END LICENSE BLOCK 
import { BrowserModule } from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import {createCustomElement} from '@angular/elements';
import { ViewerComponent } from './viewer/viewer.component';

import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { FakeDataContractComponent } from './fake-data-contract/fake-data-contract.component';

import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PersonIdentifiersComponent } from './person-identifiers/person-identifiers.component';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    FakeDataContractComponent,
    PersonIdentifiersComponent
  ],
  imports: [
    ToastrModule.forRoot({ timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,}),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DataTablesModule,
    BrowserModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ BsModalRef, BsModalService ],
  bootstrap: [AppComponent],  //Comment out when running build command for packaging
  //bootstrap: [],  //Keep for prod build

  entryComponents: [
    AppComponent
  ]

})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
 
  }
 
  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-terminus-dev-starter', el); //Must Be unique - Gets passed to Sudio
  }
  
 }
