import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';

import {LeftNavComponent} from './leftnav.component';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-home',
  templateUrl: 'home.component.html',
  directives: [LeftNavComponent]
})
export class HomeComponent implements OnInit {
  public googleUser: gapi.auth2.GoogleUser;
  private _router: Router;
  private _accountService: AccountService;

  constructor(router: Router, accountSvc: AccountService) {
    this._router = router;
    this._accountService = accountSvc;
  }

  public ngOnInit(): void {
    let currentUser = gapi.auth2.getAuthInstance().currentUser;
    this.googleUser = currentUser.get();
    this.addOrFetchAccount(this.googleUser);
  }

  private addOrFetchAccount(googleUser: gapi.auth2.GoogleUser): void {
    let authResponse: gapi.auth2.AuthResponse = googleUser.getAuthResponse();
    this._accountService.fetchOrAddAccount(authResponse.id_token)
                        .subscribe(account => this.handleAccountLogin(account));
  }
  private onRegistered(): void {
    // TODO Display stuff
    console.log(this.googleUser);
  }

  private handleAccountLogin(account: Account): void {
    if (account) {
      this.onRegistered();
    } else {
      // TODO display errors
    }
  }

}
