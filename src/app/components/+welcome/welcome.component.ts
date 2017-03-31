import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'vaxtrax-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private af: AngularFire) {}

  ngOnInit(): void {
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
