import { NgModule } from '@angular/core';

import {
  PayeeGroupsJourneyConfigurationToken,
  PayeeGroupsJourneyModule,
  PayeeGroupsJourneyConfiguration,
} from '@backbase/payee-groups-journey-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

const config: Partial<PayeeGroupsJourneyConfiguration> = {
  notificationDismissTime: 3,
};

@NgModule({
  declarations: [],
  imports: [PayeeGroupsJourneyModule.forRoot()],
  providers: [
    {
      provide: PayeeGroupsJourneyConfigurationToken,
      useValue: config,
    },
    TemplateRegistry,
  ],
})
export class PayeeGroupsJourneyBundleModule {}
