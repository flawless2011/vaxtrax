import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AngularFire, FirebaseAuth} from 'angularfire2';

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
  private _af: AngularFire;
  private _auth: FirebaseAuth;

  constructor(router: Router,
    accountSvc: AccountService,
    af: AngularFire,
    @Inject(FirebaseAuth) auth: FirebaseAuth) {
    this._router = router;
    this._accountService = accountSvc;
    this._af = af;
    this._auth = auth;
  }

  public ngOnInit(): void {
    this._auth.subscribe(authState => this.addOrFetchAccount(authState.google));
  }

  private addOrFetchAccount(googleUser: gapi.auth2.GoogleUser): void {
    console.log(googleUser);
    // TODO add or fetch the user in Firebase
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
