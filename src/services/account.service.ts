import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Account} from '../models/account';

@Injectable()
export class AccountService {

  constructor (private af: AngularFire) {}

  public fetchOrAddAccount = (idToken: string): Observable<Account> => {
    const account = this.af.database.object('/account');
    return account.map(res => <Account> res.json())
                  .catch(this.handleError);
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
