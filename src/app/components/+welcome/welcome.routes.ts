import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './';

const welcomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  }
];

export const welcomeRouting = RouterModule.forChild(welcomeRoutes);
