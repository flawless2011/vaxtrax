import {Injectable} from '@angular/core';
import {CanActivate,
        Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot} from '@angular/router';
import {AngularFire} from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private af: AngularFire
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.af.auth.subscribe(authState => console.log(authState));
    return false;
    // TODO return Observable<boolean> or boolean
  }
}
