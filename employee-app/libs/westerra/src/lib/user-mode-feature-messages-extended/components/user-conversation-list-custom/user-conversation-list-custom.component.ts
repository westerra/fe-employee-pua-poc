import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConversationListComponent,
  ConversationListFilterService,
  ConversationListService,
} from '@backbase/employee-web-app-shared-feature-message-center';
import { EmployeeHttpService } from '@backbase/messages-v5-http-ang';

@Component({
  selector: 'bb-ewa-conversation-list-custom',
  templateUrl: './user-conversation-list-custom.component.html',
})
export class UserConversationListCustomComponent
  extends ConversationListComponent
  implements OnInit, OnDestroy
{
  constructor(
    filterService: ConversationListFilterService,
    messagesService: EmployeeHttpService,
    conversationListService: ConversationListService
  ) {
    super(filterService, messagesService, conversationListService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
