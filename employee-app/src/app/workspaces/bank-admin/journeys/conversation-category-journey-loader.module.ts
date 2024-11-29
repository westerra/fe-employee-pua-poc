import { NgModule } from '@angular/core';
import { ConversationCategoryJourneyModule } from '@backbase/employee-conversation-category-journey-ang';

@NgModule({
  imports: [ConversationCategoryJourneyModule.forRoot()],
})
export class ConversationCategoryJourneyLoaderModule {}
