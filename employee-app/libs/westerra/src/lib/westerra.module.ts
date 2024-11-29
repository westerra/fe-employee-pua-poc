import { NgModule } from '@angular/core';
import { UserModeFeatureMessagesExtendedModule } from './user-mode-feature-messages-extended/user-mode-feature-messages-extended.module';
import { CommonModule } from '@angular/common';
import { UserProfileJourneyExtendedModule } from './user-profile-journey-extended/user-profile-journey-extended.module';
const exportableModules = [
  UserModeFeatureMessagesExtendedModule,
  UserProfileJourneyExtendedModule,
];

@NgModule({
  imports: [CommonModule, ...exportableModules],
  exports: [...exportableModules],
  providers: [],
  declarations: [],
})
export class WesterraModule {
}
