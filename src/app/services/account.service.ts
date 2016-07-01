import {Injectable} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {AuthResult} from '../components/welcome/authResult';
import {Account} from '../models/account';

@Injectable()
export class AccountService {

  public accountUri: string;
  private account: FirebaseObjectObservable<Account>;

  constructor (private af: AngularFire) {}

  public addOrFetchAccount = (authResult: AuthResult): FirebaseObjectObservable<Account> => {
    this.accountUri = '/account/' + authResult.loginId;
    if (this.account) {
      return this.account;
    }
    let myself = {
      firstName: authResult.firstName,
      lastName: authResult.lastName,
      gender: authResult.gender || '',
      relationship: 'me',
      imageUrl: authResult.imageUrl
    };
    const newAccount = {loginId: authResult.loginId,
                        loginSystem: authResult.loginSystem,
                        email: authResult.email,
                        family: [myself]};
    this.account = this.af.database.object(this.accountUri);
    this.account.subscribe(account => this.handleAccount(account, newAccount));
    return this.account;
  };

  private handleAccount(account: Account, newAccount: Account) {
    if (!account.email) {
      this.account.update(newAccount);
    }
  }
}
