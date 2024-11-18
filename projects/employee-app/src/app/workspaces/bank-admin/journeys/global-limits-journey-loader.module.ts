import { NgModule } from '@angular/core';
import {
  GlobalLimitsJourneyModule,
  GLOBAL_LIMITS_JOURNEY_LIMIT_BASE_PATH,
  GlobalLimitsConfigurationInterface,
  GlobalLimitsJourneyConfigurationToken,
} from '@backbase/global-limits-journey-ang';
import { APP_LIMIT_BASE_PATH } from '../../../service-paths.module';

const config: Partial<GlobalLimitsConfigurationInterface> = {
  deElevatedHeading: false,
};

@NgModule({
  imports: [GlobalLimitsJourneyModule.forRoot()],
  providers: [
    {
      provide: GLOBAL_LIMITS_JOURNEY_LIMIT_BASE_PATH,
      useExisting: APP_LIMIT_BASE_PATH,
    },
    {
      provide: GlobalLimitsJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class GlobalLimitsJourneyLoaderModule {}
