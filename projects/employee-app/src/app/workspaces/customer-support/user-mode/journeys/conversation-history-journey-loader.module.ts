import { EmployeeConversationHistoryJourneyLoaderModule } from '@backbase/employee-web-app-user-mode-feature-conversation-history';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [EmployeeConversationHistoryJourneyLoaderModule.forRoot()],
})
export class ConversationHistoryJourneyLoaderModule {}
