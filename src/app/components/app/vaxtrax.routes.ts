import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/components/+home/home.module#HomeModule'
  }
];

export const appRoutingProviders: any[] = [

];

export const appRouting = RouterModule.forRoot(routes);
