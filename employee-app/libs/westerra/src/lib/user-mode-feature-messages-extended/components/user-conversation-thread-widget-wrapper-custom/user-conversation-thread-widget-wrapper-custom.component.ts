import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ConversationListFilterService } from '@backbase/employee-web-app-shared-feature-message-center';

@Component({
  selector: 'bb-ewa-conversation-thread-widget-wrapper-custom',
  templateUrl:
    './user-conversation-thread-widget-wrapper-custom.component.html',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserConversationThreadWidgetWrapperCustomComponent {
  @Input() conversationId: string | undefined;
  /** @internal */
  constructor(private filterService: ConversationListFilterService) {}

  close(): void {
    this.filterService.closeConversation();
  }
}
