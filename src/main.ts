import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VaxtraxAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/components/app/';
import { FIREBASE_PROVIDERS,
  defaultFirebase,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig } from 'angularfire2';
import { AccountService } from './app/services/account.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(VaxtraxAppComponent, [
  APP_ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyBGFRHeQ5Z7pM6P7xBJcRvjTz3oDrNwCzo',
    authDomain: 'vaxtrax-1174.firebaseapp.com',
    databaseURL: 'https://vaxtrax-1174.firebaseio.com',
    storageBucket: 'vaxtrax-1174.appspot.com'}),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.login'
    ]
  }),
  AccountService
]);
