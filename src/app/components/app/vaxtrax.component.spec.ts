import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { VaxtraxAppComponent } from '../app/vaxtrax.component';

beforeEachProviders(() => [VaxtraxAppComponent]);

describe('App: Vaxtrax', () => {
  it('should create the app',
      inject([VaxtraxAppComponent], (app: VaxtraxAppComponent) => {
    expect(app).toBeTruthy();
  }));

});
