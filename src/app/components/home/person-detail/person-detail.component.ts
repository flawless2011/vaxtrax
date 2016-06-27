import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {Person} from '../../../models/person';
import {Immunization} from '../../../models/immunization';
import {AuthResult} from '../../welcome/authResult';

import {AccountService} from '../../../services/account.service';
import {ImmunizationComponent} from '../../immunization/immunization.component';

import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'person-detail',
  templateUrl: 'person-detail.component.html',
  styleUrls: ['person-detail.component.css'],
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
export class PersonDetailComponent implements OnInit, OnDestroy {
  private personId: string;
  private person$: FirebaseObjectObservable<any>;
  private params$: Subscription;
  public person: Person;
  public showAddImmunization: boolean = false;

  constructor(
    private accountSvc: AccountService,
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.af.auth.subscribe(authState => this.finishAuthLoad(authState));
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

  public onAddImmunizationClick(): void {
    this.showAddImmunization = true;
  }

  public onAddImmunizationEvent(): void {
    this.showAddImmunization = false;
  }

  private finishAuthLoad(authUser: any) {
    if (!authUser || !authUser.auth) {
      this.router.navigate(['']);
      return;
    }

    let nameArray = authUser.auth.displayName.split(' ');
    let firstName = nameArray.shift();
    let lastName = nameArray.join(' ');

    console.log(authUser.auth.uid);

    // Add or fetch the user in Firebase
    // TODO need a new/better way of getting the Google+ data
    let authResult = <AuthResult> {
      firstName: firstName,
      lastName: lastName,
      loginId: authUser.auth.uid,
      email: authUser.auth.email,
      imageURL: authUser.auth.photoURL,
      loginSystem: 'Google'
    };
    let account = this.accountSvc.addOrFetchAccount(authResult);

    this.params$ = this.route.params.subscribe(params => this.handleRouteParams(params));
  }

  private handleRouteParams(params: any) {
    this.personId = params['id'];
    this.person$ = this.af.database
      .object(this.accountSvc.accountUri + '/family/' + this.personId);
    this.person$.subscribe(person => this.loadPerson(person));
  }

  private loadPerson(person: Person){
    this.person = person;
  }
}
