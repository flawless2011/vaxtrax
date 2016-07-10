import { RouterConfig } from '@angular/router';

import { WelcomeComponent } from './';

export const WelcomeRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  }
];
