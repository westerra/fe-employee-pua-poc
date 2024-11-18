import { NgModule } from '@angular/core';

import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import {
  AccountGroupsJourneyConfigurationToken,
  AccountGroupsJourneyModule,
  AccountGroupsJourneyConfiguration,
} from '@backbase/account-groups-journey-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

const config: Partial<AccountGroupsJourneyConfiguration> = {
  pageSize: 10,
  notificationDismissTime: 3,
};

@NgModule({
  declarations: [],
  imports: [AccountGroupsJourneyModule.forRoot(), EntitlementsModule],
  providers: [
    {
      provide: AccountGroupsJourneyConfigurationToken,
      useValue: config,
    },
    TemplateRegistry,
  ],
})
export class AccountGroupsJourneyLoaderModule {}
