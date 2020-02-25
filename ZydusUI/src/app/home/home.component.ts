import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../Utilities/jwt-service';
import { User } from 'src/User';


@Component({ selector: 'app-Home', templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: JwtService
    ) {
      debugger;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}