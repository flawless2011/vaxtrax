import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire,
         FirebaseObjectObservable,
         FirebaseListObservable } from 'angularfire2';

import { MdIconRegistry } from '@angular/material';
import { MdSidenav } from '@angular/material';

import { AccountService } from '../../services/account.service';
import { Account, AuthResult } from '../../models';

@Component({
  selector: 'vaxtrax-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  viewProviders: [MdIconRegistry]
})
export class HomeComponent implements OnInit {
  account$: FirebaseObjectObservable<Account>;
  family$: FirebaseListObservable<any[]>;
  selectedPerson: string;

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService,
    private router: Router) {}

  ngOnInit() {
    // Not sure this is needed since we redirect to /home/0 if no personId provided
    this.af.auth.subscribe(authState => this.addOrFetchAccount(authState));
  }

  personSelected(id: string, sideNav: MdSidenav) {
    sideNav.close();
    this.selectedPerson = id;
    this.router.navigate(['/home', this.selectedPerson]);
  }

  private addOrFetchAccount(authUser: any): void {
    // TODO this all should probably go into a route guard at some point
    if (!authUser || !authUser.auth) {
      this.router.navigate(['/welcome']);
      return;
    }

    let nameArray = authUser.auth.displayName.split(' ');
    let firstName = nameArray.shift();
    let lastName = nameArray.join(' ');

    // Add or fetch the user in Firebase
    // TODO need a new/better way of getting the Google+ data
    let authResult = <AuthResult> {
      firstName: firstName,
      lastName: lastName,
      loginId: authUser.auth.uid,
      email: authUser.auth.email,
      imageUrl: authUser.auth.photoURL,
      loginSystem: 'Google'
    };
    this.account$ = this.accountSvc.addOrFetchAccount(authResult);
    this.family$ = this.af.database.list(this.accountSvc.accountUri + '/family');
  }
}
