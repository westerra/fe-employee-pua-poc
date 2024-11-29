import { NgModule } from '@angular/core';
import {
  LegalEntitiesJourneyModule,
  LegalEntitiesJourneyConfigurationToken,
  LegalEntitiesJourneyConfiguration,
  LEGAL_ENTITY_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  LEGAL_ENTITY_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  LEGAL_ENTITY_JOURNEY_CONTACT_MANAGER_BASE_PATH,
  LEGAL_ENTITY_JOURNEY_LIMIT_BASE_PATH,
  LEGAL_ENTITY_JOURNEY_USER_BASE_PATH,
} from '@backbase/legal-entities-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CONTACT_MANAGER_BASE_PATH,
  APP_LIMIT_BASE_PATH,
  APP_USER_BASE_PATH,
} from '../../../service-paths.module';
const config: Partial<LegalEntitiesJourneyConfiguration> = {
  pageSize: 10,
  notificationDismissTime: 3,
  deElevatedHeading: false,
  enableShadowLimit: true,
  enableLimit: true,
  enableUserLimit: true,
};

@NgModule({
  declarations: [],
  imports: [LegalEntitiesJourneyModule.forRoot()],
  providers: [
    {
      provide: LegalEntitiesJourneyConfigurationToken,
      useValue: config,
    },
    {
      provide: LEGAL_ENTITY_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: LEGAL_ENTITY_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: LEGAL_ENTITY_JOURNEY_CONTACT_MANAGER_BASE_PATH,
      useExisting: APP_CONTACT_MANAGER_BASE_PATH,
    },
    {
      provide: LEGAL_ENTITY_JOURNEY_LIMIT_BASE_PATH,
      useExisting: APP_LIMIT_BASE_PATH,
    },
    {
      provide: LEGAL_ENTITY_JOURNEY_USER_BASE_PATH,
      useExisting: APP_USER_BASE_PATH,
    },
  ],
})
export class LegalEntitiesJourneyLoaderModule {}
