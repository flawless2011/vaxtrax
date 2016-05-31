import {Component, OnInit, Inject} from '@angular/core';
import {FirebaseAuth, FirebaseObjectObservable} from 'angularfire2';
import {AccountService} from '../../services/account.service';

import {Account} from '../../models/account';
import {Person} from '../../models/person';

import {AuthResult} from '../welcome/authResult';

import {LeftNavComponent} from './leftnav.component';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-home',
  templateUrl: 'home.component.html',
  directives: [LeftNavComponent]
})
export class HomeComponent implements OnInit {
  public account: FirebaseObjectObservable<Account>;

  private _accountSvc: AccountService;
  private _auth: FirebaseAuth;

  constructor(
    accountSvc: AccountService,
    @Inject(FirebaseAuth) auth: FirebaseAuth) {
    this._accountSvc = accountSvc;
    this._auth = auth;
  }

  public ngOnInit(): void {
    this._auth.subscribe(authState => this.addOrFetchAccount(authState));
  }

  private addOrFetchAccount(authUser: any): void {
    // Add or fetch the user in Firebase
    let authResult = <AuthResult> {
      firstName: authUser.google.cachedUserProfile.given_name,
      lastName: authUser.google.cachedUserProfile.family_name,
      loginId: authUser.uid,
      imageURL: authUser.google.profileImageURL,
      gender: authUser.google.cachedUserProfile.gender,
      loginSystem: 'Google'
    };
    this.account = this._accountSvc.addOrFetchAccount(authResult);
  }
}
