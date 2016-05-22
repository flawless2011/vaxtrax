import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VaxtraxAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(VaxtraxAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://vaxtrax-1174.firebaseio.com')
]);
