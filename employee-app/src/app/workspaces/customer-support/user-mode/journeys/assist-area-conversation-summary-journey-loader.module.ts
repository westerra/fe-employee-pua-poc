import { NgModule } from '@angular/core';
import { ConversationSummaryJourneyModule } from '@backbase/employee-conversation-summary-journey-ang';

@NgModule({
  imports: [ConversationSummaryJourneyModule.forRoot()],
})
export class AssistAreaConversationSummaryJourneyLoaderModule {}
