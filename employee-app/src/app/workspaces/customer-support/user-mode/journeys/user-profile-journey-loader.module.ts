import { NgModule } from '@angular/core';
import {
  IdentityUserProfileJourneyModule,
  IdentityUserProfileJourneyConfiguration,
  IdentityUserProfileJourneyConfigurationToken,
} from '@backbase/identity-user-profile-journey-ang';
import { UserProfileJourneyExtendedModule } from '@backbase/westerra';

const config: Partial<IdentityUserProfileJourneyConfiguration> = {
  isAdmin: true,
  phoneNumberCountryCode: 'US',
  phoneNumberDebounceTime: 1,
  enablePhoneNumberFormatter: true,
};

@NgModule({
  imports: [
    // IdentityUserProfileJourneyModule.forRoot(),
    UserProfileJourneyExtendedModule.forRoot(),
  ],
  providers: [
    {
      provide: IdentityUserProfileJourneyConfigurationToken,
      useValue: config,
    },
  ],
})
export class UserProfileJourneyLoaderModule {}
