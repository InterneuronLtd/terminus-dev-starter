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
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
//import { SubjectsService } from './services/subjects.service';
import { Subscription } from 'rxjs';
import { ApirequestService } from '../services/apirequest.service';
import { AppService } from '../services/app.service';
//import { EscalationForm } from '../models/fluidbalanceescalation.model';
import { v4 as uuidv4 } from 'uuid';
import { SubjectsService } from '../services/subjects.service';
import { Person } from '../models/entities/core-person.model';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from '../services/toaster-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();  

  person: Person = new Person();
  personVerified: boolean = false;

     //Define  output property
  @Output() personChange:EventEmitter<Person> =new EventEmitter<Person>(); 


   //Raise the event using the emit method.
  update() {
    this.personChange.emit(this.person);
  }
   


  constructor(private apiRequest: ApirequestService, public appService: AppService, private subjects: SubjectsService, private spinner: NgxSpinnerService, private toasterService: ToasterService, private modalService: BsModalService) { 

    this.subjects.personIdChange.subscribe( () => {
      /** spinner starts on init */
    this.spinner.show("spinner1");
    
    this.subscriptions.add(
      this.apiRequest.getRequest(this.appService.baseURI + '/GetObject?synapsenamespace=core&synapseentityname=person&id=' + this.appService.personId)
        .subscribe((response) => {
          var data = JSON.parse(response);           
          this.person = data;
          this.update();
          this.spinner.hide("spinner1");
          this.toasterService.showToaster("info", this.person.fullname + " loaded");          
        })
    )
    
  }
    )
}
  ngOnDestroy(): void {
   this.subscriptions.unsubscribe();
  }
  

  ngOnInit() {
    
  }

    //Modal
    confirmModalRef: BsModalRef;
  
    
    openConfirmModal(template: TemplateRef<any>) {
      this.confirmModalRef = this.modalService.show(template, {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-sm modal-dialog-centered'
      });
    }

    verify(): void {      
      this.confirmModalRef.hide();
      this.toasterService.showToaster("success", this.person.fullname + "  verified");   
      this.personVerified = true;
    }
  
    unverify(): void {
      this.confirmModalRef.hide();
      this.toasterService.showToaster("error", this.person.fullname + "  unverified");
      this.personVerified = false;
    }
  
    cancel(): void {
      this.confirmModalRef.hide();
  
    }
  

}
