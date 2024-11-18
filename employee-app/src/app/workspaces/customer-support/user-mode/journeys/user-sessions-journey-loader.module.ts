import { NgModule } from '@angular/core';
import {
  IdentityUserSessionsJourneyModule,
  IdentityUserSessionsJourneyConfiguration,
  IdentityUserSessionsJourneyConfigurationToken,
} from '@backbase/identity-user-sessions-journey-ang';

const config: Partial<IdentityUserSessionsJourneyConfiguration> = {
  isAdmin: true,
};

@NgModule({
  imports: [IdentityUserSessionsJourneyModule.forRoot()],
  providers: [
    {
      provide: IdentityUserSessionsJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class UserSessionsJourneyLoaderModule {}
