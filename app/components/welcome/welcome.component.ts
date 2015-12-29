import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'vaxtrax-welcome',
  templateUrl: 'app/views/vaxtrax/welcome.html'
})
export class WelcomeComponent {
  constructor(
    private _router: Router
  ) { }

  public onGoogleSignin(googleUser: any): void {
    // todo
    this._router.navigate(['Home', {id: 1}]);
  }

  public onStartClick(): void {
    // todo
    this._router.navigate(['Home', {id: 1}]);
  }
}
