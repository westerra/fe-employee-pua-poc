import { NgModule } from '@angular/core';
import {
  MacJourneyModule,
  MacConfigurationInterface,
  MacJourneyConfigurationToken,
  MAC_JOURNEY_APPROVAL_BASE_PATH,
  MAC_JOURNEY_ACCESS_CONTROL_BASE_PATH,
} from '@backbase/mac-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_APPROVAL_BASE_PATH,
} from '../../../service-paths.module';

const config: Partial<MacConfigurationInterface> = {
  deElevatedHeading: false,
  isGlobal: true,
  isEmployeeApp: true,
};

@NgModule({
  imports: [MacJourneyModule.forRoot()],
  providers: [
    {
      provide: MacJourneyConfigurationToken,
      useValue: config,
    },
    {
      provide: MAC_JOURNEY_APPROVAL_BASE_PATH,
      useExisting: APP_APPROVAL_BASE_PATH,
    },
    {
      provide: MAC_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
  ],
})
export class GlobalMacJourneyLoaderModule {}
