import { NgModule } from '@angular/core';
import { UserEnrollmentJourneyModule } from '@backbase/employee-user-enrollment-journey-ang';

@NgModule({
  imports: [UserEnrollmentJourneyModule.forRoot()],
})
export class UserEnrollmentJourneyLoaderModule {}
