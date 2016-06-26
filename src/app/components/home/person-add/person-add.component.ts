import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {Person} from '../../../models/person';
import {AccountService} from '../../../services/account.service';

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
  @Input('showAddPerson') showAddPerson: boolean;
  @Output() addPersonEvent = new EventEmitter<boolean>();
  private family$: FirebaseListObservable<any[]>;

  constructor(
    private _accountSvc: AccountService,
    private _af: AngularFire
  ) {}

  ngOnInit() {
    this.family$.subscribe();
  }

  public cancelAdd(): void {
    this.addPersonEvent.emit(false);
  }

  public onSubmit(person: Person): void {
    this.family$.push(person);
    this.addPersonEvent.emit(true);
  }


}
