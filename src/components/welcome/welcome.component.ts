import {Component, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'vaxtrax-welcome',
  templateUrl: './welcome.component.html'
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

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public ngAfterContentInit(): void {
    this.onRender();
  }

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
