import {Component, Input} from '@angular/core';
import {Account} from '../../models/account';
import {Person} from '../../models/person';

import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {PersonComponent} from './person.component';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-leftnav',
  templateUrl: 'leftnav.component.html',
  directives: [MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES, PersonComponent]
})
export class LeftNavComponent {
  @Input('account') account: Account;
  public selectedPerson: Person;

  public personSelected(index: number): void {
    this.selectedPerson = this.account.family[index];
  }
}
