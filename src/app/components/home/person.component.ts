import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Person} from '../../models/person';
import {Immunization} from '../../models/immunization';

import {AccountService} from '../../services/account.service';
import {ImmunizationComponent} from '../immunization/immunization.component';

import {FirebaseListObservable, AngularFire} from 'angularfire2';

import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
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
    MdIcon,
    MdRadioButton,
    MdRadioGroup,
    ImmunizationComponent
  ],
  providers: [MdRadioDispatcher, MdIconRegistry]
})
export class PersonComponent implements OnInit, OnChanges {
  @Input('personIndex') personIndex: number;
  private family$: FirebaseListObservable<any[]>;
  public family: Person[];
  public person: Person;
  public showAddImmunization: boolean = false;
  @Input('showAddPerson') showAddPerson: boolean;
  @Output() addPersonEvent = new EventEmitter<boolean>();

  constructor (
    private _accountSvc: AccountService,
    private _af: AngularFire) {}

  public ngOnInit() {
    this.family$ = this._af.database
      .list(this._accountSvc.accountUri + '/family');
    this.family$.subscribe(family => this.family = family);
  }

  public ngOnChanges(changes: any) {
    if (this.family && changes.personIndex) {
      this.person = this.family[this.personIndex];
    }
  }

  public cancelAdd(): void {
    this.addPersonEvent.emit(false);
  }

  public onSubmit(person: Person): void {
    this.family$.push(person);
    this.addPersonEvent.emit(true);
  }

  public onAddImmunizationClick(): void {
    this.showAddImmunization = true;
  }

  public onAddImmunizationEvent(): void {
    this.showAddImmunization = false;
  }
}
