import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'vaxtrax',
  templateUrl: 'app/views/vaxtrax/vaxtrax.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
  {path: '/:id/home', name: 'Home', component: HomeComponent}
])
export class AppComponent { }
