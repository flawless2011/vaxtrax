import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

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
    HTTP_PROVIDERS
  ]
})

export class VaxtraxAppComponent {
}
