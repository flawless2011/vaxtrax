import {Component, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AngularFire, FirebaseAuthState} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-welcome',
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements AfterContentInit {

  private _router: Router;
  private _af: AngularFire;

  constructor(router: Router, af: AngularFire) {
    this._router = router;
    this._af = af;
  }

  public onSignin = (auth: FirebaseAuthState): void => {
    console.log(auth);
    if (auth && auth.google) {
      this._router.navigate(['Home', {id: 0}]);
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
