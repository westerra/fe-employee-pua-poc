import { NgModule } from '@angular/core';
import { EmployeeUserOverviewJourneyModule } from '@backbase/employee-web-app-user-mode-feature-user-overview';

@NgModule({
  imports: [EmployeeUserOverviewJourneyModule.forRoot()],
})
export class UserOverviewJourneyLoaderModule {}
