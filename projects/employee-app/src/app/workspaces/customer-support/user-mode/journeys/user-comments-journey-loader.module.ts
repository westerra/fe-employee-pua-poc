import { NgModule } from '@angular/core';
import { EmployeeUserCommentsJourneyModule } from '@backbase/employee-web-app-user-mode-feature-user-comments';

@NgModule({
  imports: [EmployeeUserCommentsJourneyModule.forRoot()],
})
export class UserCommentsJourneyLoaderModule {}
