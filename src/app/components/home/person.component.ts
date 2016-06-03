import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Person} from '../../models/person';
import {AccountService} from '../../services/account.service';

import {FirebaseListObservable, AngularFire} from 'angularfire2';

import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-person',
  templateUrl: 'person.component.html',
  styleUrls: ['person.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdRadioButton,
    MdRadioGroup
  ],
  providers: [MdRadioDispatcher]
})
export class PersonComponent implements OnInit {
  @Input('personIndex') personIndex: number;
  public family: FirebaseListObservable<any[]>;
  @Input('showAddPerson') addPersonFormShowing: boolean;
  @Output() addPersonEvent = new EventEmitter<boolean>();

  constructor (private _accountSvc: AccountService, public af: AngularFire) {}

  public ngOnInit() {
    this.family = this.af.database
      .list(this._accountSvc.accountUri + '/family');
  }

  public cancelAdd(): void {
    this.addPersonEvent.emit(false);
  }

  public onSubmit(person): void {
    this.family.push(person);
    this.addPersonEvent.emit(true);
  }
}
