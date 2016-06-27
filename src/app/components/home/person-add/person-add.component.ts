import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {Person} from '../../../models/person';
import {AccountService} from '../../../services/account.service';
import {AuthResult} from '../../welcome/authResult';

import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'person-add',
  templateUrl: 'person-add.component.html',
  styleUrls: ['person-add.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdIcon,
    MdRadioButton,
    MdRadioGroup
  ],
  providers: [MdRadioDispatcher, MdIconRegistry]
})
export class PersonAddComponent implements OnInit {
  private family$: FirebaseListObservable<any[]>;

  constructor(
    private accountSvc: AccountService,
    private af: AngularFire,
    private router: Router
  ) {}

  ngOnInit() {
    this.af.auth.subscribe(authState => this.finishAuthLoad(authState));
  }

  public cancelAdd(): void {
    this.router.navigate(['/home']);
  }

  public onSubmit(person: any): void {
    this.family$.push(person);
    this.router.navigate(['/home']);
  }

  private finishAuthLoad(authUser: any) {
    if (!authUser || !authUser.auth) {
      this.router.navigate(['']);
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
    let account = this.accountSvc.addOrFetchAccount(authResult);
    this.family$ = this.af.database.list(this.accountSvc.accountUri + '/family');
    this.family$.subscribe(family => console.log(family));
  }

}
