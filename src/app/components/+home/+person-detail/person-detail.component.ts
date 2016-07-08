import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FirebaseObjectObservable,
         FirebaseListObservable,
         AngularFire } from 'angularfire2';

import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { Person, AuthResult } from '../../../models';
import { AccountService } from '../../../services/account.service';
import { ImmunizationComponent } from '../+immunization/immunization.component';

@Component({
  moduleId: module.id,
  selector: 'person-detail',
  templateUrl: 'person-detail.component.html',
  styleUrls: ['person-detail.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdIcon,
    ImmunizationComponent
  ],
  providers: [MdIconRegistry]
})
export class PersonDetailComponent implements OnInit, OnDestroy {
  person: Person;
  showAddImmunization: boolean = false;

  private personId: string;
  private person$: FirebaseObjectObservable<any>;
  private upcoming$: FirebaseListObservable<any[]>;
  private completed$: FirebaseListObservable<any[]>;
  private params: Subscription;

  constructor(
    private accountSvc: AccountService,
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.personId = params['id'];
      this.af.auth.subscribe(authState => this.finishAuthLoad(authState));
    });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  onAddImmunizationClick() {
    this.showAddImmunization = true;
  }

  onAddImmunizationEvent($event: boolean) {
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

    // Add or fetch the user in Firebase
    // TODO need a new/better way of getting the Google+ data
    let authResult = <AuthResult> {
      firstName: firstName,
      lastName: lastName,
      loginId: authUser.auth.uid,
      email: authUser.auth.email,
      imageUrl: authUser.auth.photoURL,
      loginSystem: 'Google'
    };
    this.accountSvc.addOrFetchAccount(authResult);
    this.fetchPerson();
  }

  private fetchPerson() {
    this.person$ = this.af.database
      .object(this.accountSvc.accountUri + '/family/' + this.personId);
    this.person$.subscribe(person => this.person = person);
    this.upcoming$ = this.af.database.list(this.accountSvc.accountUri + '/family/' + this.personId + '/upcoming');
    this.completed$ = this.af.database.list(this.accountSvc.accountUri + '/family/' + this.personId + '/completed');
  }
}
