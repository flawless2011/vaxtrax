import {
  addProviders,
  ComponentFixture,
  TestComponentBuilder,
  inject,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ImmunizationComponent } from './immunization.component';

describe('Component: Immunization', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([ImmunizationComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ImmunizationComponent],
      (component: ImmunizationComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ImmunizationComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ImmunizationComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <add-immunization></add-immunization>
  `,
  directives: [ImmunizationComponent]
})
class ImmunizationComponentTestController {
}
