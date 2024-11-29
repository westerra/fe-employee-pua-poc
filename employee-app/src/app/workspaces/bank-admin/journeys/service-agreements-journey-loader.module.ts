import { NgModule } from '@angular/core';
import {
  ServiceAgreementCommunicationService,
  ServiceAgreementsJourneyConfiguration,
  ServiceAgreementsJourneyConfigurationToken,
  ServiceAgreementsJourneyModule,
} from '@backbase/service-agreements-journey-ang';
import { ServiceAgreementModeContextService } from '@backbase/employee-web-app-shared-data-service-agreement-mode-context';
const config: Partial<ServiceAgreementsJourneyConfiguration> = {
  pageSize: 10,
  notificationDismissTime: 3,
  deElevatedHeading: false,
  enableShadowLimit: true,
  enableLimit: true,
};

@NgModule({
  imports: [ServiceAgreementsJourneyModule.forRoot()],
  providers: [
    {
      provide: ServiceAgreementsJourneyConfigurationToken,
      useValue: config,
    },
    {
      provide: ServiceAgreementCommunicationService,
      useExisting: ServiceAgreementModeContextService,
    },
  ],
})
export class ServiceAgreementsJourneyLoaderModule {}
