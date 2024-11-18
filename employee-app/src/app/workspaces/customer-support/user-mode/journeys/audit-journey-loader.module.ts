import { NgModule } from '@angular/core';
import {
  AuditJourneyModule,
  AuditJourneyConfiguration,
  AuditJourneyConfigurationToken,
  AUDIT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  AUDIT_JOURNEY_AUDIT_BASE_PATH,
} from '@backbase/audit-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_AUDIT_BASE_PATH,
} from '../../../../service-paths.module';

const config: AuditJourneyConfiguration = {
  userIdRouteParam: 'userId',
  displayHeading: false
}

@NgModule({
  imports: [
    AuditJourneyModule.forRoot()
  ],
  providers: [
    {
      provide: AuditJourneyConfigurationToken,
      useValue: config
    },
    {
      provide: AUDIT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: AUDIT_JOURNEY_AUDIT_BASE_PATH,
      useExisting: APP_AUDIT_BASE_PATH,
    },
  ],
})
export class AuditJourneyLoaderModule {}
