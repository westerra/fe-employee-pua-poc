import { NgModule } from '@angular/core';
import {
  CustomApprovalConfigurationInterface,
  CustomApprovalJourneyConfigurationToken,
  CustomApprovalJourneyModule,
  CustomApprovalJourneyCommunicationService,
} from '@backbase/custom-approval-journey-ang';
import { ApprovalJourneyCommunicationService } from '@backbase/employee-web-app-service-agreement-mode-data-approvals';

const config: Partial<CustomApprovalConfigurationInterface> = {
  displayHeading: false,
};

@NgModule({
  imports: [CustomApprovalJourneyModule.forRoot()],
  providers: [
    { provide: CustomApprovalJourneyConfigurationToken, useValue: config },
    {
      provide: CustomApprovalJourneyCommunicationService,
      useExisting: ApprovalJourneyCommunicationService,
    },
  ],
})
export class ApprovalsJourneyLoaderModule {}
