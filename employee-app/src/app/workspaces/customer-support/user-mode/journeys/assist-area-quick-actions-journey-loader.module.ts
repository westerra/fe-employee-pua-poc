import { NgModule } from '@angular/core';

import { QuickAssistJourneyModule } from '@backbase/employee-quick-assist-journey-ang';
import { AssistAreaQuickActionsExtensionsModule, ResetPasswordConfirmationExtensionComponent, AccountAccessLockedRelatedGuidanceComponent, AccountAccessUnlockedRelatedGuidanceComponent, AccountAccessRevokedRelatedGuidanceComponent } from 'quick-assist/extensions/src';

@NgModule({
  imports: [
    AssistAreaQuickActionsExtensionsModule,
    QuickAssistJourneyModule.forRoot({
      viewExtensions: {
        resetPasswordConfirmation: ResetPasswordConfirmationExtensionComponent,
        accountAccessRelatedGuidanceLockAccount:
          AccountAccessLockedRelatedGuidanceComponent,
        accountAccessRelatedGuidanceUnlockAccount:
          AccountAccessUnlockedRelatedGuidanceComponent,
        accountAccessRelatedGuidanceRevokeAccount:
          AccountAccessRevokedRelatedGuidanceComponent,
      },
    }),
  ],
})
export class AssistAreaQuickActionsJourneyLoaderModule {}
