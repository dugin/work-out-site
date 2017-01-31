//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NouisliderModule } from 'ng2-nouislider';
//routes
import { routing } from './app.routing'

//services
import { RegisterService } from './services/register.service';
import { FirebaseService } from './services/firebase.service';
import { CepService } from './services/cep.service';


// component
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FocusDirective } from './directives/focus.directive';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminComponent } from './components/admin/admin.component';

// chart component
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';

import 'hammerjs';
import "Chart.js";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBzTPqCQxkBLbGwo8fO_IjkKyI9LPJGYr0",
  authDomain: "work-out-348f6.firebaseapp.com",
  databaseURL: "https://work-out-348f6.firebaseio.com",
  storageBucket: "work-out-348f6.appspot.com",
  messagingSenderId: "737729029715"
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FocusDirective,
    LoginComponent,
    MainComponent,
    AdminRegisterComponent,
    AdminComponent,
    PieChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    TextMaskModule,
    MaterializeModule,
    ChartsModule,
    NouisliderModule

  ],
  providers: [RegisterService, FirebaseService, CepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
