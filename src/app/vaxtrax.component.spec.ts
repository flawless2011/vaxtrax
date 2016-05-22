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

  it('should have as title \'vaxtrax works!\'',
      inject([VaxtraxAppComponent], (app: VaxtraxAppComponent) => {
    expect(app.title).toEqual('vaxtrax works!');
  }));
});