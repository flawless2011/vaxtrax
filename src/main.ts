import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VaxtraxAppComponent, environment } from './app/components/app/';
import { FIREBASE_PROVIDERS,
  defaultFirebase,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig } from 'angularfire2';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AccountService } from './app/services/account.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(VaxtraxAppComponent, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    storageBucket: '<your-storage-bucket'}),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
  }),
  AccountService
]);
