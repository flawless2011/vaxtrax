import { NgModule } from '@angular/core';

import { welcomeRouting } from './welcome.routes';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    welcomeRouting
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule {}
