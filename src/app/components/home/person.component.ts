import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Person} from '../../models/person';

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
export class PersonComponent {
  @Input('person') person: Person;
  @Input('addPerson') addPersonFormShowing: boolean;
  @Output() cancelAddEvent = new EventEmitter<boolean>();

  public cancelAdd(): void {
    this.cancelAddEvent.emit(true);
  }
}
