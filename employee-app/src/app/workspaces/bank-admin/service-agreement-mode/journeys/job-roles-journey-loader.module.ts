import { NgModule } from '@angular/core';

import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import {
  JobRolesJourneyConfiguration,
  JobRolesJourneyModule,
  JobRolesJourneyConfigurationToken,
} from '@backbase/job-roles-journey-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

const config: Partial<JobRolesJourneyConfiguration> = {
  notificationDismissTime: 3,
  enableShadowLimit: true,
  enableLimit: true,
  approvalLevelEnabled: true,
};

@NgModule({
  declarations: [],
  imports: [JobRolesJourneyModule.forRoot(), EntitlementsModule],
  providers: [
    {
      provide: JobRolesJourneyConfigurationToken,
      useValue: config,
    },
    TemplateRegistry,
  ],
})
export class JobRolesJourneyLoaderModule {}
