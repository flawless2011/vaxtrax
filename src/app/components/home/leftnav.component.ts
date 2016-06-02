import {Component, Input} from '@angular/core';
import {Account} from '../../models/account';
import {Person} from '../../models/person';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {PersonComponent} from './person.component';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-leftnav',
  templateUrl: 'leftnav.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdIcon,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    PersonComponent
  ],
  providers: [MdIconRegistry]
})
export class LeftNavComponent {
  @Input('account') account: Account;
  public selectedPerson: Person;
  public addPersonIndicator: boolean = false;

  public personSelected(index: number): void {
    this.selectedPerson = this.account.family[index];
  }

  public addPerson(): void {
    this.addPersonIndicator = true;
  }

  public onCancelAddPerson(value: boolean) {
    this.addPersonIndicator = false;
  }
}
