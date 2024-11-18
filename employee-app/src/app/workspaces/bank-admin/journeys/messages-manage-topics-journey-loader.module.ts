import { NgModule } from '@angular/core';
import {
  MessagesManageTopicsJourneyConfigurationProvider,
  MessagesManageTopicsJourneyModule
} from '@backbase/messages-manage-topics-journey-ang';

@NgModule({
  imports: [MessagesManageTopicsJourneyModule.forRoot()],
  providers: [MessagesManageTopicsJourneyConfigurationProvider]
})
export class MessagesManageTopicsJourneyLoaderModule {}
