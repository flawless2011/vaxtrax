/// <reference path="../../../typings/gapi.auth2/gapi.auth2.d.ts" />
import {Component, AfterContentInit} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'vaxtrax-welcome',
  templateUrl: 'app/views/vaxtrax/welcome.html'
})
export class WelcomeComponent implements AfterContentInit {

  public onGoogleSignin = (googleUser: gapi.auth2.GoogleUser): void => {
    // todo
    console.log('I am ' + googleUser.getBasicProfile().getName());
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
    gapi.signin2.render('my-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onGoogleSignin,
        'onfailure': this.onFailure
      });
  }

  public onStartClick(): void {
    // todo
    this._router.navigate(['Home', {id: 1}]);
  }
}
