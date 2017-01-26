//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';


//routes
import { routing } from './app.routing'

//services
import { RegisterService } from './services/register.service';
import { FirebaseService } from './services/firebase.service';
import { CepService } from './services/cep.service';


// component
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';

import 'hammerjs';
import { FocusDirective } from './directives/focus.directive';
import { LoginComponent } from './components/login/login.component';


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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    TextMaskModule,
    MaterializeModule

  ],
  providers: [RegisterService, FirebaseService, CepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
