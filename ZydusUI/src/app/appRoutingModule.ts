import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouteGuard } from './Utilities/route-guard'
import { DoctorlistComponent } from './doctorlist/doctorlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'DoctorList', component: DoctorlistComponent, outlet: 'content' }
    ],canActivate:[RouteGuard]
  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
