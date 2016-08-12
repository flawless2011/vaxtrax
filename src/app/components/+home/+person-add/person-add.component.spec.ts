import {
  addProviders,
  ComponentFixture,
  TestComponentBuilder,
  inject,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonAddComponent } from './person-add.component';

describe('Component: PersonAdd', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([PersonAddComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([PersonAddComponent],
      (component: PersonAddComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(PersonAddComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(PersonAddComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <person-add></person-add>
  `,
  directives: [PersonAddComponent]
})
class PersonAddComponentTestController {
}
