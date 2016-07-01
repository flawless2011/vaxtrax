import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {NgForm} from '@angular/common';

import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';

import {FirebaseListObservable, AngularFire} from 'angularfire2';

import {AccountService} from '../../services/account.service';
import {Immunization} from '../../models/immunization';

@Component({
  moduleId: module.id,
  selector: 'add-immunization',
  templateUrl: 'immunization.component.html',
  styleUrls: ['immunization.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdRadioButton,
    MdRadioGroup
  ],
  providers: [MdUniqueSelectionDispatcher]
})
export class ImmunizationComponent implements OnInit {
  @Input('personId') personId: string;
  private upcoming$: FirebaseListObservable<any[]>;
  @Output() addImmunizationEvent = new EventEmitter<boolean>();

  public immunization: Immunization = {
    name: '',
    type: '',
    scheduledDate: new Date(),
    dosageValue: 0,
    dosageUnit: ''
  };

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService
  ) {}

  ngOnInit() {
    this.upcoming$ = this.af.database
      .list(this.accountSvc.accountUri + '/family/' + this.personId + '/upcoming');
    this.upcoming$.subscribe(upcoming => this.upcomingWatcher(upcoming));
  }

  upcomingWatcher(upcoming) {
    console.log(upcoming);
  }

  onCancel() {
    this.addImmunizationEvent.emit(false);
  }

  onSubmit() {
    this.upcoming$.push(this.immunization);
    this.addImmunizationEvent.emit(true);
  }
}
