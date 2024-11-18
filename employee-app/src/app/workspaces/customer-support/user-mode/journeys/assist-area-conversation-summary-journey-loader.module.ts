import { NgModule } from '@angular/core';
import { ConversationSummaryJourneyLoaderModule } from '@backbase/employee-web-app-user-mode-feature-conversation-summary';

@NgModule({
  imports: [ConversationSummaryJourneyLoaderModule.forRoot()],
})
export class AssistAreaConversationSummaryJourneyLoaderModule {}
