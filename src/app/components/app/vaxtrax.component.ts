import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-app',
  templateUrl: 'vaxtrax.component.html',
  styleUrls: ['vaxtrax.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS
  ]
})

export class VaxtraxAppComponent {
}
