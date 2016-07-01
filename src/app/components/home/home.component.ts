import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable} from 'angularfire2';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {AccountService} from '../../services/account.service';

import {Account} from '../../models/account';
import {AuthResult} from '../welcome/authResult';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdIcon,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  providers: [MdIconRegistry]
})
export class HomeComponent implements OnInit {
  public account: FirebaseObjectObservable<Account>;
  public family: FirebaseListObservable<any[]>;
  public selectedPerson: string;

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService,
    private router: Router) {}

  public ngOnInit() {
    this.af.auth.subscribe(authState => this.addOrFetchAccount(authState));
  }

  public personSelected(id: string, sideNav: MdSidenav) {
    sideNav.close();
    this.selectedPerson = id;
    this.router.navigate(['/home', this.selectedPerson]);
  }

  private addOrFetchAccount(authUser: any): void {
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
      imageUrl: authUser.auth.photoURL,
      loginSystem: 'Google'
    };
    this.account = this.accountSvc.addOrFetchAccount(authResult);
    this.family = this.af.database.list(this.accountSvc.accountUri + '/family');
  }
}
