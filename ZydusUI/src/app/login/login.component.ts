import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService} from '../Utilities/jwt-service';
import { first } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { User } from 'src/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

 
  constructor(private router:Router,private authenticationService:JwtService,private route: ActivatedRoute,) { 
    // debugger;
    // if (this.authenticationService.currentUserValue) { 
    //   this.router.navigate(['/Home']);
    //   }
    

  }

  ngOnInit() {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Home';
  }
  

  UserName:string;
  Password:string;
  LogState:boolean;
 // private authenticationService: JwtService
  returnUrl:String
  error:string


  OnLogin_CLick()
  {
    debugger;
    this.authenticationService.login(this.UserName, this.Password)
            .pipe(first())
            .subscribe(
                data => {
                  debugger;
                    this.router.navigate(['/home']);
                    //this.router.navigate(['/Home']);
                    this.LogState=true;
                },
                error => {
                    this.error = error;
                   
                });

    if (this.authenticationService.loggedIn == true) this.router.navigate(['/home']);
    else {
      
      this.router.navigate(['login']);
    }
        

   }

}
