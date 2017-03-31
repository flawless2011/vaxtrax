import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdRippleModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdRadioModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdProgressCircleModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

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
