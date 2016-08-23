import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { VaxtraxAppModule, environment} from './app/components/app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(VaxtraxAppModule);
