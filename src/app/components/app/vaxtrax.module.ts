import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { VaxtraxAppComponent } from './vaxtrax.component';
import { appRouting, appRoutingProviders } from './vaxtrax.routes';

import { AccountService } from '../../services/account.service';
import { WelcomeModule } from '../+welcome/welcome.module';
import { HomeModule } from '../+home/home.module';

import { AngularFireModule,
         AuthMethods,
         AuthProviders } from 'angularfire2';

const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  databaseURL: '<YOUR_FIREBASE_DB_URL>',
  storageBucket: '<YOUR_STORAGE_BUCKET>'
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
      FormsModule,
      HttpModule,
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
