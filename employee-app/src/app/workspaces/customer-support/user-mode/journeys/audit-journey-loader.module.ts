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
  displayHeading: true,
  heading: $localize`:Activity log header|The header on activity log tab of the User Mode in the Customer Support workspace@@bb-employee-mode-user-activity-log.header: Activity log`,
};

@NgModule({
  imports: [AuditJourneyModule.forRoot()],
  providers: [
    {
      provide: AuditJourneyConfigurationToken,
      useValue: config,
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
