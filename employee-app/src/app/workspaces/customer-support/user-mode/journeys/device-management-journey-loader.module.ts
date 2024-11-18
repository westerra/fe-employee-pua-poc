import { NgModule } from '@angular/core';
import {
  IdentityDeviceManagementJourneyConfiguration,
  IdentityDeviceManagementJourneyConfigurationToken,
  IdentityDeviceManagementJourneyModule,
} from '@backbase/identity-device-management-journey-ang';

const config: Partial<IdentityDeviceManagementJourneyConfiguration> = {
  isAdmin: true,
};

@NgModule({
  imports: [IdentityDeviceManagementJourneyModule.forRoot()],
  providers: [
    {
      provide: IdentityDeviceManagementJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class DeviceManagementJourneyLoaderModule {}
