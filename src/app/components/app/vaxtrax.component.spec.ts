import {
  addProviders,
  inject
} from '@angular/core/testing';
import { VaxtraxAppComponent } from '../app/vaxtrax.component';

beforeEach(() => {
  addProviders([VaxtraxAppComponent]);
});

describe('App: Vaxtrax', () => {
  it('should create the app',
      inject([VaxtraxAppComponent], (app: VaxtraxAppComponent) => {
    expect(app).toBeTruthy();
  }));

});
