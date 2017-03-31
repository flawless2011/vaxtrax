import { NgModule } from '@angular/core';

import { MdCardModule } from '@angular/material';

import { welcomeRouting } from './welcome.routes';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    welcomeRouting,
    MdCardModule
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule {}
