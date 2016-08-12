import {
  addProviders,
  ComponentFixture,
  TestComponentBuilder,
  inject,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonDetailComponent } from './person-detail.component';

describe('Component: PersonDetail', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([PersonDetailComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([PersonDetailComponent],
      (component: PersonDetailComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(PersonDetailComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(PersonDetailComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <person-detail></person-detail>
  `,
  directives: [PersonDetailComponent]
})
class PersonDetailComponentTestController {
}
