import {Component, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFire, AuthProviders} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-welcome',
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements AfterContentInit {

  constructor(
    private _router: Router,
    private _af: AngularFire) {}

  public onSignin = (auth: any): void => {
    console.log(auth.auth.providerData[0]);
    if (auth && AuthProviders.Google === auth.provider) {
      this._router.navigate(['/home', 0]);
    }
  };

  public ngAfterContentInit(): void {
    // this.onRender();
    this._af.auth.subscribe(auth => this.onSignin(auth));
  }

  public login = (): void => {
    this._af.auth.login();
  };

}
