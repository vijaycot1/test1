import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { JwtService } from '../Utilities/jwt-service';
import { User } from 'src/User';
 
@Component({ selector: 'app-Home', templateUrl: 'home.component.html' })
export class HomeComponent {
  currentUser: User;
 // isOpened: boolean = false;
  //@Output() toggleEmitter = new EventEmitter<boolean>();

    constructor(
        private router: Router,
      private authenticationService: JwtService,
        private activatedRoute:ActivatedRoute
    ) {
      debugger;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     // this.isOpened = false;
    }

  logout(islogoutClicked:boolean) {
    debugger;
    if (islogoutClicked = true) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
    }

  //OnMenuSelection(Path: String) {
  //  //this.router.navigate([{ outlets: { "navbar": ["side-nav"] } }], {relativeTo:this.activatedRoute});
  //  debugger;
  //  this.router.navigate([{ outlets: { 'content': '/DoctorList', 'primary': '/home' } }]);
  //}

  toggle() {
    debugger;
   // this.isOpened = true;
   // this.toggleEmitter.emit(this.isOpened);
    //this.router.navigate([{ outlets: { "navbar": ["side-nav"] } }], { relativeTo: this.activatedRoute });
  }
}
