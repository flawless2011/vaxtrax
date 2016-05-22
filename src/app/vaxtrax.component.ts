import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'vaxtrax-app',
  templateUrl: 'vaxtrax.component.html',
  styleUrls: ['vaxtrax.component.css']
})
export class VaxtraxAppComponent {
  title = 'Vaxtrax works!';
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
}
