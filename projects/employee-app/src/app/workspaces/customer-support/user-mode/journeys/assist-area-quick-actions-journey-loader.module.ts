import { EmployeeAssistAreaQuickActionsJourneyModule } from '@backbase/employee-web-app-user-mode-feature-assist-area-quick-actions';
import { NgModule } from '@angular/core';
import {
  AssistAreaQuickActionsExtensionsModule,
  ResetPasswordConfirmationExtensionComponent,
  AccountAccessLockedRelatedGuidanceComponent,
  AccountAccessRevokedRelatedGuidanceComponent,
  AccountAccessUnlockedRelatedGuidanceComponent,
} from './extensions/assist-area-quick-actions/assist-area-quick-actions-extensions.module';
@NgModule({
  imports: [
    AssistAreaQuickActionsExtensionsModule,
    EmployeeAssistAreaQuickActionsJourneyModule.forRoot({
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
