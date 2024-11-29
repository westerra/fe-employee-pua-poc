import { NgModule } from '@angular/core';
import { PocketsJourneyModule } from '@backbase/employee-web-app-pockets-journey-ang';

@NgModule({
  imports: [PocketsJourneyModule.forRoot()],
})
export class PocketsJourneyLoaderModule {}
