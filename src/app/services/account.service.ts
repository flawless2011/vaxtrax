import {Injectable} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {AuthResult} from '../components/welcome/authResult';
import {Account} from '../models/account';

@Injectable()
export class AccountService {

  public accountUri: string;

  constructor (private af: AngularFire) {}

  public addOrFetchAccount = (authResult: AuthResult): FirebaseObjectObservable<Account> => {
    this.accountUri = '/account/' + authResult.loginId;
    const account = this.af.database.object(this.accountUri);
    const newAccount = {loginId: authResult.loginId,
                        loginSystem: authResult.loginSystem,
                        email: authResult.email,
                        family: [{firstName: authResult.firstName,
                                  lastName: authResult.lastName,
                                  gender: authResult.gender,
                                  relationship: 'me',
                                  imageURL: authResult.imageURL}]};
    account.update(newAccount);
    return account;
  };
}
