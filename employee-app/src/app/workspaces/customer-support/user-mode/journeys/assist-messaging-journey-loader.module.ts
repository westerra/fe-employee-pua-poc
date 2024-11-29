import { NgModule } from '@angular/core';
import { AssistMessagingJourneyModule } from '@backbase/employee-assist-messaging-journey-ang';

@NgModule({
  imports: [AssistMessagingJourneyModule.forRoot()],
})
export class AssistMessagingJourneyLoaderModule {}
