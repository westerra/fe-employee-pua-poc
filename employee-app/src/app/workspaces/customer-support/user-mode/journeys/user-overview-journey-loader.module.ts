import { NgModule } from '@angular/core';
import { UserOverviewJourneyModule } from '@backbase/employee-user-overview-journey-ang';

@NgModule({
  imports: [UserOverviewJourneyModule.forRoot()],
})
export class UserOverviewJourneyLoaderModule {}
