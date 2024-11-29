import { NgModule } from '@angular/core';
import { AssistedCardManagementJourneyModule } from '@backbase/employee-assisted-card-management-journey-ang';

@NgModule({
  imports: [AssistedCardManagementJourneyModule.forRoot()],
})
export class CardsJourneyLoaderModule {}
