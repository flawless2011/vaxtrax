import {Component, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFire, AuthProviders} from 'angularfire2';

import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  directives: [
    MdButton,
    MD_CARD_DIRECTIVES
  ]
})
export class WelcomeComponent implements AfterContentInit {

  constructor(
    private router: Router,
    private af: AngularFire) {}

  ngAfterContentInit(): void {
    // this.onRender();
    this.af.auth.subscribe(auth => this.onSignin(auth));
  }

  login = (): void => {
    this.af.auth.login();
  };

  private onSignin = (auth: any): void => {
    console.log(auth);
    if (auth && AuthProviders.Google === auth.provider) {
      this.router.navigate(['/home', 0]);
    }
  };
}
