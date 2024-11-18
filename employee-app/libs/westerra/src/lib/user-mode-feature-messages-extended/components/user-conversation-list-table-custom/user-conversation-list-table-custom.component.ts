import { Component, Input, OnInit } from '@angular/core';
import { ConversationListFilterService } from '@backbase/employee-web-app-shared-feature-message-center';
import { EmployeeConversationThread } from '@backbase/messages-v5-http-ang';

@Component({
  selector: 'bb-ewa-conversation-list-table-custom',
  templateUrl: './user-conversation-list-table-custom.component.html',
})
export class UserConversationListTableCustomComponent {
  @Input() conversations: EmployeeConversationThread[];

  /** @deprecated Will be removed as no longer used*/
  @Input() highlightUnread: boolean;

  constructor(private filterService: ConversationListFilterService) {
    this.filterService = filterService;

    /** @deprecated Will be removed as no longer used*/
    this.highlightUnread = false;
  }

  openConversation(id: string): void {
    this.filterService.openConversation(id);
  }
}
