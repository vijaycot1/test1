import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from './jwt-service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  isLoggedIn:boolean;

  constructor(private router:Router,private auth:JwtService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isLoggedIn=this.auth.loggedIn;
    if(this.isLoggedIn) return true;
    else
    { this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
    } 
}
}
