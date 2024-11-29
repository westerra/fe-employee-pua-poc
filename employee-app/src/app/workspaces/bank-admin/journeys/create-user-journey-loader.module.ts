import { NgModule } from '@angular/core';
import {
  IdentityCreateUserJourneyModule,
  IdentityCreateUserJourneyConfigurationToken,
} from '@backbase/identity-create-user-journey-ang';
import { IdentityCreateUserJourneyConfiguration } from '@backbase/internal-identity-create-user-util';

const config: Partial<IdentityCreateUserJourneyConfiguration> = {
  notificationDismissTime: 3,
  phoneNumberCountryCode: 'US',
  phoneNumberDebounceTime: 1,
  enablePhoneNumberFormatter: true,
  displaySetEntitlements: false,
  displayViewUserDetails: false,
};

@NgModule({
  imports: [IdentityCreateUserJourneyModule.forRoot()],
  providers: [
    { provide: IdentityCreateUserJourneyConfigurationToken, useValue: config },
  ],
})
export class CreateUserJourneyLoaderModule {}
