import { RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { PersonDetailComponent } from './+person-detail/person-detail.component';
import { PersonAddComponent } from './+person-add/person-add.component';

export const HomeRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/home/0',
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: PersonAddComponent
      },
      {
        path: ':id',
        component: PersonDetailComponent
      }
    ]
  }
];
