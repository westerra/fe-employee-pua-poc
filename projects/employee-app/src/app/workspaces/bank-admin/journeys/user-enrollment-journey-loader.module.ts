import { NgModule } from '@angular/core';
import { EmployeeUserEnrollmentJourneyModule } from '@backbase/employee-web-app-bank-admin-feature-user-enrollment';

@NgModule({
  imports: [
    EmployeeUserEnrollmentJourneyModule.forRoot()
  ]
})
export class UserEnrollmentJourneyLoaderModule {}
