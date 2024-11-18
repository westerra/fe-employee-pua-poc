import { NgModule } from '@angular/core';
import {
  AuditJourneyModule,
  AUDIT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  AUDIT_JOURNEY_AUDIT_BASE_PATH,
  AuditJourneyConfiguration,
  AuditJourneyConfigurationToken,
} from '@backbase/audit-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_AUDIT_BASE_PATH,
} from '../../../service-paths.module';

const config: AuditJourneyConfiguration = {
  showMetadataToggle: false,
};

@NgModule({
  imports: [
    AuditJourneyModule.forRoot()
  ],
  providers: [
    {
      provide: AUDIT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: AUDIT_JOURNEY_AUDIT_BASE_PATH,
      useExisting: APP_AUDIT_BASE_PATH,
    },
    {
      provide: AuditJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class AuditJourneyLoaderModule {}