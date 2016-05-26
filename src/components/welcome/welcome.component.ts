import {Component, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AngularFire, FirebaseAuthState} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-welcome',
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements AfterContentInit {

  public userSignedIn: boolean = false;

  public onGoogleSignin = (googleUser: gapi.auth2.GoogleUser): void => {
    // todo
    if (googleUser) {
      this.userSignedIn = true;
      this._router.navigate(['Home', {id: 0}]);
    }
    console.log('I am ' + JSON.stringify(googleUser));
  };

  public onSignin = (auth: FirebaseAuthState): void => {
    console.log(auth);
    if (auth.google){
      this.onGoogleSignin(auth.google);
    }
  }

  private _router: Router;
  private _af: AngularFire;

  constructor(router: Router, af: AngularFire) {
    this._router = router;
    this._af = af;
    this._af.auth.subscribe(auth => this.onSignin(auth));
  }

  public ngAfterContentInit(): void {
    this.onRender();
  }

  public login = (): void => {
    this._af.auth.login();
  };

  public onFailure(): void {
    // tod
    console.log('in onFailure');
  }

  public onRender(): void {
    gapi.signin2.render('google-signin', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onGoogleSignin,
        'onfailure': this.onFailure
      });
  }
}
