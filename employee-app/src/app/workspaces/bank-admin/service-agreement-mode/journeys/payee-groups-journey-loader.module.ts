import { NgModule } from '@angular/core';

import {
  PayeeGroupsJourneyConfigurationToken,
  PayeeGroupsJourneyModule,
  PayeeGroupsJourneyConfiguration,
} from '@backbase/payee-groups-journey-ang';
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
  ],
})
export class PayeeGroupsJourneyBundleModule {}
