import {Routes, RouterModule} from "@angular/router";

import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';



const APP_ROUTES : Routes = [
    { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full'}
   
]

export const routing = RouterModule.forRoot(APP_ROUTES);