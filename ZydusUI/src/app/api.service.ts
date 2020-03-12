import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
import{HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, throwError, observable } from 'rxjs';
import { User } from '../User';
import { retry, catchError } from 'rxjs/operators';
import {Login} from './Login.Model'

import{map} from 'rxjs/operators'

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
//UserList:User[]
 apiValues: Login[]
value:String[];

  

  constructor(private http:HttpClient) { }
  public getUsers():Login[] {
    
    
    debugger;
    console.log("Will be hitting API");
    console.log("Url is: "+API_URL);
     

      this.http
      .get(API_URL)
      .subscribe((responseData:Login[])=>{
        debugger;
        this.apiValues=responseData;console.log(responseData)});
     var check=this.apiValues;
     console.log(this.apiValues);
      return this.apiValues;
      
     
      
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
