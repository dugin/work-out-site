import { AdminComponent } from './components/admin/admin.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { MainComponent } from './components/main/main.component';
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';




const APP_ROUTES: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'main', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register/admin', component: AdminRegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component: AdminRegisterComponent },


]

export const routing = RouterModule.forRoot(APP_ROUTES);

