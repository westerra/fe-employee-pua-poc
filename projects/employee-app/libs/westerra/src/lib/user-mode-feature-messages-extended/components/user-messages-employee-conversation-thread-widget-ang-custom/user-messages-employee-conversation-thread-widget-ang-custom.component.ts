import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesEmployeeConversationThreadWidgetComponent } from '@backbase/messages-employee-inbox-journey-feature';
import {
  AbstractBaseMessagesConversationThreadService,
  EmployeeConversationThreadWidgetPropertiesService,
  MessagesEmployeeConversationThreadWidgetService,
  MessagesManipulationConfirmModalService,
  SharedMethodsService,
} from '@backbase/messages-shared-data-access';
import { MessagesUploadAttachmentsService } from '@backbase/messages-shared-feature';
import { MessagesEncodingService } from '@backbase/messages-shared-util';

@Component({
  selector: 'bb-messages-employee-conversation-thread-widget-ang-custom',
  templateUrl:
    './user-messages-employee-conversation-thread-widget-ang-custom.component.html',
})
export class UserMessagesEmployeeConversationThreadWidgetAngCustomComponent extends MessagesEmployeeConversationThreadWidgetComponent {
  constructor(
    messagesService: MessagesEmployeeConversationThreadWidgetService,
    properties: EmployeeConversationThreadWidgetPropertiesService,
    cd: ChangeDetectorRef,
    confirmModalService: MessagesManipulationConfirmModalService,
    encodingService: MessagesEncodingService,
    uploadService: MessagesUploadAttachmentsService,
    apiThreadService: AbstractBaseMessagesConversationThreadService,
    activatedRoute: ActivatedRoute,
    shared: SharedMethodsService
  ) {
    super(
      messagesService,
      properties,
      cd,
      confirmModalService,
      encodingService,
      uploadService,
      apiThreadService,
      activatedRoute,
      shared
    );
  }
}
