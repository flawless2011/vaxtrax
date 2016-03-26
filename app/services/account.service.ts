import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Account} from '../models/account';

@Injectable()
export class AccountService {

  private ADD_ACCOUNT_URL: string = 'http://localhost:8080/api/account'; // TODO

  constructor (private http: Http) {}

  public fetchOrAddAccount(idToken: string) : Observable<Account> {
    let body = JSON.stringify({idToken: idToken});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.ADD_ACCOUNT_URL, body, options)
                    .map(res => <Account> res.json())
                    .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
