import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { FirebaseObjectObservable,
         AngularFire } from 'angularfire2';

import { MdIconRegistry } from '@angular/material';

import { AccountService } from '../../../services/account.service';
import { Person, AuthResult, Immunization } from '../../../models';

@Component({
  selector: 'person-detail',
  templateUrl: 'person-detail.component.html',
  styleUrls: ['person-detail.component.css'],
  viewProviders: [MdIconRegistry]
})
export class PersonDetailComponent implements OnInit, OnDestroy {
  person: Person;
  showAddImmunization: boolean = false;
  upcoming$: Observable<Immunization[]>;
  completed$: Observable<Immunization[]>;

  private personId: string;
  private immunizationId: string;
  private person$: FirebaseObjectObservable<any>;
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

  onImmunizationItemClick($key: string) {
    this.immunizationId = $key;
    this.showAddImmunization = true;
  }

  onAddImmunizationClick() {
    this.showAddImmunization = true;
  }

  onAddImmunizationEvent($event: boolean) {
    this.showAddImmunization = false;
  }

  private finishAuthLoad(authUser: any) {
    // TODO this all should probably go into a route guard at some point
    if (!authUser || !authUser.auth) {
      this.router.navigate(['/welcome']);
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
    this.person$.subscribe(person => this.person = person); // Investigate possible leak since not unsubscribing
    this.upcoming$ = this.af.database.list(this.accountSvc.accountUri + '/family/' + this.personId + '/vaccinations')
      .map(vaccinations => {
        return vaccinations.filter(vaccination => !vaccination.completedDate);
      });
    this.completed$ = this.af.database.list(this.accountSvc.accountUri + '/family/' + this.personId + '/vaccinations')
      .map(vaccinations => {
        return vaccinations.filter(vaccination => vaccination.completedDate);
      });
  }
}
