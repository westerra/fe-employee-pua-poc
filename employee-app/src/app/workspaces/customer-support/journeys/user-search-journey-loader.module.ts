import { NgModule } from '@angular/core';
import {
  IdentityUserSearchJourneyModule,
  USER_SEARCH_COMMUNICATION_SERVICE,
} from '@backbase/identity-user-search-journey-ang';
import { UserModeUserContextService } from '@backbase/employee-web-app-shared-data-user-mode-context';

@NgModule({
  imports: [IdentityUserSearchJourneyModule.forRoot()],
  providers: [
    {
      provide: USER_SEARCH_COMMUNICATION_SERVICE,
      useExisting: UserModeUserContextService,
    },
  ],
})
export class UserSearchJourneyLoaderModule {}
