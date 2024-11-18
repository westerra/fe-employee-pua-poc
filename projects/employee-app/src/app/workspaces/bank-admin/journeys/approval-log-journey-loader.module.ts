import { NgModule } from '@angular/core';

import {
  ApprovalLogJourneyConfiguration,
  ApprovalLogJourneyConfigurationToken,
  ApprovalLogJourneyModule,
} from '@backbase/approval-log-journey-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

const config: Partial<ApprovalLogJourneyConfiguration> = {
  pageSize: 10,
  notificationDismissTime: 3,
};

@NgModule({
  declarations: [],
  imports: [ApprovalLogJourneyModule.forRoot()],
  providers: [
    {
      provide: ApprovalLogJourneyConfigurationToken,
      useValue: config,
    },
    TemplateRegistry,
  ],
})
export class ApprovalLogJourneyLoaderModule {}
