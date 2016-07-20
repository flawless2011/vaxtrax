import { Component,
         EventEmitter,
         SimpleChanges,
         OnChanges,
         OnInit,
         Input,
         Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdRadioButton, MdRadioGroup } from '@angular2-material/radio';

import { FirebaseListObservable,
         FirebaseObjectObservable,
         AngularFire } from 'angularfire2';

import { AccountService } from '../../../services/account.service';
import { Immunization } from '../../../models';

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
export class ImmunizationComponent implements OnInit, OnChanges {
  @Input() personId: string;
  @Input() immId: string;
  @Output() addImmunizationEvent = new EventEmitter<boolean>();
  immunization: Immunization = {
    name: '',
    type: '',
    scheduledDate: new Date(),
    dosageValue: null,
    dosageUnit: ''
  };

  private upcoming$: FirebaseListObservable<any[]>;
  private immunization$: FirebaseObjectObservable<any>;

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['immId'] && changes['immId'].currentValue) {
      this.immunization$ = this.af.database.object(this.accountSvc.accountUri + '/family/' + this.personId + '/vaccinations/' + this.immId);
      this.immunization$.subscribe(immunization => this.initImmunization(immunization));
    }
  }

  ngOnInit() {
    this.upcoming$ = this.af.database
      .list(this.accountSvc.accountUri + '/family/' + this.personId + '/vaccinations');
    this.upcoming$.subscribe(upcoming => this.upcomingWatcher(upcoming));
  }

  onCancel() {
    this.addImmunizationEvent.emit(false);
  }

  onSubmit() {
    if (this.immId) {
      this.immunization$.update(this.immunization);
    } else {
      this.upcoming$.push(this.immunization);
    }
    this.addImmunizationEvent.emit(true);
  }

  private upcomingWatcher(upcoming) {
    console.log(upcoming);
  }

  private initImmunization(immunization: any) {
    immunization.id = immunization.$key;
    delete immunization.$key; // Get rid of field that Firebase doesn't like apparently
    this.immunization = immunization;
  }
}
