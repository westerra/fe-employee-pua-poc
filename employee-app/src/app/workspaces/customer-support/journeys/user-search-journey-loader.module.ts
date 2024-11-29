import { NgModule } from '@angular/core';
import {
  UserSearchEssentialsJourneyModule,
} from '@backbase/employee-user-search-essentials-journey-ang';
import { UserModeUserContextService } from '@backbase/employee-web-app-shared-data-user-mode-context';

@NgModule({
  imports: [UserSearchEssentialsJourneyModule.forRoot()],
})
export class UserSearchJourneyLoaderModule {}
