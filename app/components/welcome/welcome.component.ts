/// <reference path="../../../typings/gapi.auth2/gapi.auth2.d.ts" />
import {Component, AfterContentInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';

@Component({
  selector: 'vaxtrax-welcome',
  templateUrl: 'app/views/vaxtrax/welcome.html'
})
export class WelcomeComponent implements AfterContentInit {

  public userSignedIn: boolean = false;

  public onGoogleSignin = (googleUser: gapi.auth2.GoogleUser): void => {
    // todo
    if(googleUser) {
      this.userSignedIn = true;
      this.addOrFetchAccount(googleUser);
    }
    console.log('I am ' + JSON.stringify(googleUser));
  };

  private _router: Router;
  private _accountService: AccountService;
  private _account: Account;

  constructor(router: Router, accountSvc: AccountService) {
    this._router = router;
    this._accountService = accountSvc;
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

  public onStartClick(): void {
    // todo
    this._router.navigate(['Home', {id: 1}]);
  }

  private addOrFetchAccount(googleUser: gapi.auth2.GoogleUser) {
    let authResponse: gapi.auth2.AuthResponse = googleUser.getAuthResponse();
    this._accountService.fetchOrAddAccount(authResponse.id_token)
                        .subscribe(account => this._account);
  }
}
