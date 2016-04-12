import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HomeComponent} from '../home/home.component';
import {AccountService} from '../../services/account.service';

import {MdToolbar} from '@angular2-material/toolbar';

@Component({
  selector: 'vaxtrax',
  templateUrl: 'app/views/vaxtrax/vaxtrax.html',
  directives: [ROUTER_DIRECTIVES, MdToolbar],
  providers: [
    AccountService,
    HTTP_PROVIDERS
  ]
})
@RouteConfig([
  {path: '/', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
  {path: '/home/:id', name: 'Home', component: HomeComponent}
])
export class AppComponent { }
