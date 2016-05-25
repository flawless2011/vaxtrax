import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HomeComponent} from '../home/home.component';
import {AccountService} from '../../services/account.service';

import {MdToolbar} from '@angular2-material/toolbar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-app',
  templateUrl: 'vaxtrax.component.html',
  styleUrls: ['vaxtrax.component.css'],
  directives: [ROUTER_DIRECTIVES, MdToolbar, MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES],
  providers: [
    AccountService,
    HTTP_PROVIDERS
  ]
})
@RouteConfig([
  {path: '/', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
  {path: '/home/:id', name: 'Home', component: HomeComponent}
])
export class VaxtraxAppComponent {
  title = 'Vaxtrax works!';
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
}
