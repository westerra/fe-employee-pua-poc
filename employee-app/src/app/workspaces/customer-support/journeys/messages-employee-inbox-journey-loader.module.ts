import { NgModule, Provider } from '@angular/core';
import {
  MessagesEmployeeInboxJourneyConfiguration,
  MessagesEmployeeInboxJourneyConfigurationToken,
  MessagesEmployeeInboxJourneyModule,
} from '@backbase/messages-employee-inbox-journey-ang';
import { APP_MESSAGES_BASE_PATH } from '../../../service-paths.module';
const CustomMessagesEmployeeInboxJourneyConfiguration: Array<Provider> = [
  {
    provide: MessagesEmployeeInboxJourneyConfigurationToken,
    useValue: {
      createMessageOpenEventName: 'bb.event.messages.create.message.open',
      createMessageClosedEventName: 'bb.event.messages.create.message.close',
      itemsPerPage: 10,

      // eslint-disable-next-line max-len
      // customerServiceTitle: $localize`:Employee Inbox Journey - Customer Service title@@messages-employee-inbox-journey.customer-service-title:Customer Service`,
      // viewType: 'all',
      // hideAssignedToColumn: false,
      // showMailboxTypes: true,
      // maxAttachmentSize: '10',
      replyMessageMaxLength: '2000',
      maxSubjectLength: 1000,
      maxMessageLength: 2000,
      // minSearchLength: 1,

      // eslint-disable-next-line max-len
      // modalHeader: $localize`:Employee Inbox Journey - Create new message modal header@@messages-employee-inbox-journey.create-new-message-modal-header:New message`,
      // hideComposeButton: true,
      // shouldPreDefineUser: true,
      // isPreDefinedUserReadonly: true,
      // senderDisplayName: 'Backbase',
    } as Partial<MessagesEmployeeInboxJourneyConfiguration>,
  },
  // {
  //   provide: MESSAGES_EMPLOYEE_INBOX_JOURNEY_MESSAGES_BASE_PATH,
  //   useExisting: APP_MESSAGES_BASE_PATH,
  // },
];

@NgModule({
  imports: [MessagesEmployeeInboxJourneyModule.forRoot()],
  providers: [CustomMessagesEmployeeInboxJourneyConfiguration],
})
export class MessagesEmployeeInboxJourneyLoaderModule {}
