import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VaxtraxAppComponent, environment } from './components/app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

if (environment.production) {
  enableProdMode();
}

bootstrap(VaxtraxAppComponent, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://vaxtrax-1174.firebaseio.com')
]);
