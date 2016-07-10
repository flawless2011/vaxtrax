import { provideRouter } from '@angular/router';

import { HomeRoutes } from '../+home/home.routes';
import { WelcomeRoutes } from '../+welcome/welcome.routes';

export const routes = [
  ...WelcomeRoutes,
  ...HomeRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
