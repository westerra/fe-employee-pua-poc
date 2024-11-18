import { NgModule } from '@angular/core';

import {
  UserPermissionsJourneyModule,
  UserPermissionsJourneyConfiguration,
  UserPermissionsJourneyConfigurationToken,
} from '@backbase/user-permissions-journey-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

const config: Partial<UserPermissionsJourneyConfiguration> = {
  pageSize: 10,
  notificationDismissTime: 3,
  enableShadowLimit: true,
  enableLimit: true,
  approvalLevelEnabled: true,
  dataGroupsType: 'ARRANGEMENTS',
};

@NgModule({
  imports: [UserPermissionsJourneyModule.forRoot()],
  providers: [
    {
      provide: UserPermissionsJourneyConfigurationToken,
      useValue: config,
    },
    TemplateRegistry,
  ],
})
export class UserPermissionsJourneyLoaderModule {}
