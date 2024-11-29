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
  changeUsernameEnabled: false,
  hideCurrentUsername: false,
  usernameValidationRules: [
    {
      label: $localize`:User friendly description of the alphanumeric characters validation rule@@bb-user-profile.change-username.validation-rules.only-alphanumeric-characters.text:Usernames must contain only alphanumeric characters.`,
      pattern: '^([A-Za-z0-9À-úÀ-ÿØ-öø-ÿα-ωΑ-Ω\\-\\_\\.])+$',
      validatorName: 'onlyAlphanumeric',
    },
    {
      label: $localize`:User friendly description of the min/max length validation rule@@bb-user-profile.change-username.validation-rules.length.text:Usernames must contain between 4 and 32 characters.`,
      pattern: '^.{4,32}$',
      validatorName: 'length',
    },
  ],
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
