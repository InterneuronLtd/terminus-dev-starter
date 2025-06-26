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
import { Injectable } from '@angular/core';
import { Encounter } from '../models/entities/encounter.model';
import { ConfigModel } from '../models/config.model';
import { action } from '../models/filter.model';
// @ts-ignore  
import jwt_decode from "jwt-decode";
import { KeyValuePair } from '../models/keyvaluepair';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public personId: string;
  public encounterId: string;
  public contexts: [KeyValuePair];
  public encounter: Encounter;
  public isCurrentEncouner = false;
  public apiService: any;
  public baseURI: string;
  public appConfig = new ConfigModel();
  public loggedInUserName: string = null;
  public enableLogging = true;
  public roleActions: action[] = [];
  reset(): void {
    this.personId = null;
    this.encounter = null;
    this.encounterId = null;    
    this.isCurrentEncouner = false;
    this.apiService = null;
    this.baseURI = null;    
    this.appConfig = new ConfigModel();
    this.loggedInUserName = null;
    this.enableLogging = true;
    this.roleActions = [];    
  }
  
  constructor() { }

  logToConsole(msg: any) {
    if (this.enableLogging) {
      //this.appService.logToConsole(msg);
    }
  }

  decodeAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      console.log("JWT Decode Error:" + Error)
      return null;
    }
  }

  public authoriseAction(action: string): boolean {
    return this.roleActions.filter(x => x.actionname.toLowerCase() == action.toLowerCase()).length > 0;
  }


}
