import { NgModule } from '@angular/core';

import {
  ApprovalLogJourneyConfiguration,
  ApprovalLogJourneyConfigurationToken,
  ApprovalLogJourneyModule,
} from '@backbase/approval-log-journey-ang';
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
  ],
})
export class ApprovalLogJourneyLoaderModule {}
