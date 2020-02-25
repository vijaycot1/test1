import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{ApiService} from './api.service'
import { User } from 'src/User';
import { Login } from './Login.Model';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ApiService]
})
export class AppComponent implements OnInit {
  id:String;
  Users:Login[]=new Array();
  apiValues:String[]
  title = 'Hello World!';
   API_URL = environment.apiUrl_Users;
  
  constructor(private route:ActivatedRoute,private RestService:ApiService,private http:HttpClient){
    
  }
  ngOnInit()
  {
    // debugger;
    // this.getValues();
    // this.id=this.route.snapshot.params['ID'];
  }

  getValues()
  {
    debugger;
    this.http
      .get(this.API_URL)
      .subscribe((responseData:Login[])=>{
        debugger;
        this.Users=responseData;console.log(this.Users)});

  }
 
onButtonClick() {
    debugger;
    this.title = 'Hello from Kendo UI!';
}

  loadUsers() {
    this.RestService.getUsers()
    this.Users=this.RestService.apiValues;
   
}
}
