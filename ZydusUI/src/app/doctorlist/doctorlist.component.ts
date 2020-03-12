import { Component, OnInit } from '@angular/core';
import { Login } from '../Login.Model';
import { ApiService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  constructor(private http: HttpClient) { }

  id: String;
  Users: Login[] = new Array();
  apiValues: String[]
  title = 'Hello World!';
 // API_URL = environment.apiUrl_Users;
  ngOnInit() {
    debugger;
    
    this.http
      .get('http://localhost:9001/Users')
      .subscribe((responseData: Login[]) => {
        debugger;
        this.Users = responseData; console.log(this.Users)
      });
  }

  //loadUsers() {
  //  this.RestService.getUsers()
  //  this.Users = this.RestService.apiValues;

  //}

}
