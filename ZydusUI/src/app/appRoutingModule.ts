import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: '', redirectTo: 'login',pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {path:'home', component: HomeComponent}
];

export const appRoutingModule = RouterModule.forRoot(routes);