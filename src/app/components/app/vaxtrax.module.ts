import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { VaxtraxAppComponent } from './vaxtrax.component';
import { appRouting, appRoutingProviders } from './vaxtrax.routes';

import { AccountService } from '../../services/account.service';
import { WelcomeModule } from '../+welcome/welcome.module';
import { HomeModule } from '../+home/home.module';

import { AngularFireModule,
         AuthMethods,
         AuthProviders } from 'angularfire2';

const firebaseConfig = {
  apiKey: 'AIzaSyCnCXQW9QXC5BNShYZtHT-VTLcqjJh3oHs',
  authDomain: 'vaxtrax-1174.firebaseapp.com',
  databaseURL: 'https://vaxtrax-1174.firebaseio.com',
  storageBucket: 'vaxtrax-1174.appspot.com'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/plus.login'
  ]
};

@NgModule({
    declarations: [VaxtraxAppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
      MaterialModule,
      appRouting,
      WelcomeModule,
      HomeModule,
      AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ],
    providers: [
      appRoutingProviders,
      AccountService
    ],
    bootstrap: [
      VaxtraxAppComponent
    ]
})
export class VaxtraxAppModule {}
