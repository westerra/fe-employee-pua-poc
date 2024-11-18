import { NgModule } from '@angular/core';
import {
  IdentityAdminManageLoginSecurityJourneyConfigurationToken,
  IdentityAdminManageLoginSecurityJourneyModule,
} from '@backbase/identity-admin-manage-login-security-journey-ang';
import { IdentityAdminManageLoginSecurityJourneyConfiguration } from '@backbase/identity-admin-manage-login-security-util';

const config: Partial<IdentityAdminManageLoginSecurityJourneyConfiguration> = {
  notificationDismissTime: 3,
  requiredUserActionsDebounceTime: 1,
};

@NgModule({
  imports: [IdentityAdminManageLoginSecurityJourneyModule.forRoot()],
  providers: [
    {
      provide: IdentityAdminManageLoginSecurityJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class AdminManageLoginSecurityJourneyLoaderModule {}
