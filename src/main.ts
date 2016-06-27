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
    apiKey: '<YOUR_API_KEY>',
    authDomain: '<YOUR_AUTH_DOMAIN>',
    databaseURL: '<YOUR_FIREBASE_DB_URL>',
    storageBucket: '<YOUR_STORAGE_BUCKET>'}),
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
