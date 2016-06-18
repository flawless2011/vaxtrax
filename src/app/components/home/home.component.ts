import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable} from 'angularfire2';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {PersonComponent} from './person.component';

import {AccountService} from '../../services/account.service';

import {Account} from '../../models/account';
import {Person} from '../../models/person';

import {AuthResult} from '../welcome/authResult';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdIcon,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    PersonComponent
  ],
  providers: [MdIconRegistry]
})
export class HomeComponent implements OnInit {
  public account: FirebaseObjectObservable<Account>;
  public family: FirebaseListObservable<any[]>;
  public selectedPerson: number;
  public addPersonIndicator: boolean = false;

  constructor(
    private _af: AngularFire,
    private _accountSvc: AccountService,
    private _router: Router) {}

  public ngOnInit() {
    this._af.auth.subscribe(authState => this.addOrFetchAccount(authState));
  }

  public personSelected(index: number) {
    this.selectedPerson = index;
  }

  public addPerson() {
    this.addPersonIndicator = true;
  }

  public onAddPerson(value: Person) {
    this.addPersonIndicator = false;
  }

  private addOrFetchAccount(authUser: any): void {
    if (!authUser || !authUser.auth) {
      this._router.navigate(['Welcome']);
      return;
    }

    let nameArray = authUser.auth.displayName.split(' ');
    let firstName = nameArray.shift();
    let lastName = nameArray.join(' ');

    console.log(authUser.auth.uid);

    // Add or fetch the user in Firebase
    // TODO need a new/better way of getting the Google+ data
    let authResult = <AuthResult> {
      firstName: firstName,
      lastName: lastName,
      loginId: authUser.auth.uid,
      email: authUser.auth.email,
      imageURL: authUser.auth.photoURL,
      loginSystem: 'Google'
    };
    this.account = this._accountSvc.addOrFetchAccount(authResult);
    this.family = this._af.database.list(this._accountSvc.accountUri + '/family');
    this.selectedPerson = 0;
  }
}
