import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from '@backbase/ui-ang/alert';
import { IconModule } from '@backbase/ui-ang/icon';
import { ResetPasswordConfirmationExtensionComponent } from './reset-password-confirmation-extension/reset-password-confirmation-extension.component';
import { AccountAccessUnlockedRelatedGuidanceComponent } from './account-access-unlocked-related-guidance/account-access-unlocked-related-guidance.component';
import { AccountAccessLockedRelatedGuidanceComponent } from './account-access-locked-related-guidance/account-access-locked-related-guidance.component';
import { AccountAccessRevokedRelatedGuidanceComponent } from './account-access-revoked-related-guidance/account-access-revoked-related-guidance.component';
import { ButtonModule } from '@backbase/ui-ang/button';

@NgModule({
  imports: [CommonModule, AlertModule, IconModule, ButtonModule],
  declarations: [
    ResetPasswordConfirmationExtensionComponent,
    AccountAccessLockedRelatedGuidanceComponent,
    AccountAccessUnlockedRelatedGuidanceComponent,
    AccountAccessRevokedRelatedGuidanceComponent,
  ],
  exports: [
    ResetPasswordConfirmationExtensionComponent,
    AccountAccessLockedRelatedGuidanceComponent,
    AccountAccessUnlockedRelatedGuidanceComponent,
    AccountAccessRevokedRelatedGuidanceComponent,
  ],
})
export class AssistAreaQuickActionsExtensionsModule {}

export {
  ResetPasswordConfirmationExtensionComponent,
  AccountAccessLockedRelatedGuidanceComponent,
  AccountAccessUnlockedRelatedGuidanceComponent,
  AccountAccessRevokedRelatedGuidanceComponent,
}
