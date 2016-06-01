import {Component, Input} from '@angular/core';
import {Person} from '../../models/person';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-person',
  templateUrl: 'person.component.html',
  directives: []
})
export class PersonComponent {
  @Input('person') person: Person;

}
