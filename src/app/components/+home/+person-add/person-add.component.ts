import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseListObservable, AngularFire } from 'angularfire2';

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdRadioButton, MdRadioGroup } from '@angular2-material/radio';

import { AccountService } from '../../../services/account.service';
import { AuthResult, Person } from '../../../models';

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
  providers: [MdUniqueSelectionDispatcher, MdIconRegistry]
})
export class PersonAddComponent implements OnInit {
  person: Person = {
    firstName: '',
    lastName: '',
    relationship: ''
  };

  private family$: FirebaseListObservable<any[]>;

  constructor(
    private accountSvc: AccountService,
    private af: AngularFire,
    private router: Router
  ) {}

  ngOnInit() {
    this.af.auth.subscribe(authState => this.finishAuthLoad(authState));
  }

  cancelAdd() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (!this.person.imageUrl) {
      this.person.imageUrl = './assets/defaultPerson.png';
    }
    this.family$.push(this.person);
    this.router.navigate(['/home']);
  }

  private finishAuthLoad(authUser: any) {
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
    this.accountSvc.addOrFetchAccount(authResult);
    this.family$ = this.af.database.list(this.accountSvc.accountUri + '/family');
    this.family$.subscribe(family => console.log(family));
  }

}
