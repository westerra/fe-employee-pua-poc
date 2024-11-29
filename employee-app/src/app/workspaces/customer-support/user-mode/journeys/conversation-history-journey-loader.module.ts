import { NgModule } from '@angular/core';
import { ConversationHistoryJourneyModule } from '@backbase/employee-conversation-history-journey-ang';

@NgModule({
  imports: [ConversationHistoryJourneyModule.forRoot()],
})
export class ConversationHistoryJourneyLoaderModule {}
