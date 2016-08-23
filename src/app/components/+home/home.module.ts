import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdRippleModule } from '@angular2-material/core/ripple/ripple';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list';
import { MdIconModule } from '@angular2-material/icon';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdInputModule } from '@angular2-material/input';

import { HomeComponent } from './home.component';
import { homeRouting } from './home.routes';

import { PersonAddComponent } from './+person-add/person-add.component';
import { PersonDetailComponent } from './+person-detail/person-detail.component';
import { ImmunizationComponent } from './+immunization/immunization.component';

@NgModule({
  imports: [
    homeRouting,
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSidenavModule,
    MdToolbarModule,
    MdCheckboxModule,
    MdRadioModule,
    MdListModule,
    MdIconModule,
    MdProgressCircleModule,
    MdRippleModule
  ],
  declarations: [
    HomeComponent,
    PersonDetailComponent,
    PersonAddComponent,
    ImmunizationComponent
  ]
})
export class HomeModule {}
