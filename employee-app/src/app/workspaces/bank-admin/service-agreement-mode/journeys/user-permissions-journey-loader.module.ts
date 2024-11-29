import { NgModule } from '@angular/core';

import {
  UserPermissionsJourneyModule,
  UserPermissionsJourneyConfiguration,
  UserPermissionsJourneyConfigurationToken,
} from '@backbase/user-permissions-journey-ang';
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
  ],
})
export class UserPermissionsJourneyLoaderModule {}
