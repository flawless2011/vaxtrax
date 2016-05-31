import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VaxtraxAppComponent, environment } from './components/app/';
import { FIREBASE_PROVIDERS,
  defaultFirebase,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig } from 'angularfire2';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AccountService } from './services/account.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(VaxtraxAppComponent, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://boiling-fire-1699.firebaseio.com'),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
  }),
  AccountService
]);
