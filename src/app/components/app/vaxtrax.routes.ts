import {provideRouter} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HomeRoutes} from '../home/home.routes';

export const routes = [
  ...HomeRoutes,
  {path: '', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
