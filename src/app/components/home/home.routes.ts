import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {PersonDetailComponent} from './person-detail/person-detail.component';

export const HomeRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: ':id',
        component: PersonDetailComponent
      }
    ]
  }
];
